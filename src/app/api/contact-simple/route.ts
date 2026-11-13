import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { safeDisplayName, singleLine } from '@/lib/contact-request';
import { confirmationGate, contactRateLimit, getClientIp } from '@/lib/rate-limit';
import { simpleContactSchema } from '@/lib/simple-contact-schema';
import { SimpleContactConfirmation, simpleConfirmationSubject } from '@/emails/SimpleContactConfirmation';
import { SimpleContactNotification } from '@/emails/SimpleContactNotification';

const FROM = process.env.RESEND_FROM_EMAIL || 'Patrick Bartosik <contact@bartosik.fr>';
const ADMIN = process.env.RESEND_ADMIN_EMAIL || 'contact@bartosik.fr';

const isFilled = (body: unknown, key: string): boolean =>
    typeof body === 'object' && body !== null && typeof (body as Record<string, unknown>)[key] === 'string'
    && ((body as Record<string, string>)[key]).trim() !== '';

export async function POST(request: NextRequest) {
    // 1. Rate limit
    if (!contactRateLimit(getClientIp(request.headers))) {
        return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'validation', fields: [] }, { status: 400 });
    }

    // 2. Honeypot: pretend it worked, send nothing
    if (isFilled(body, 'website')) {
        return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. Validation
    const parsed = simpleContactSchema.safeParse(body);
    if (!parsed.success) {
        const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0] ?? '')).filter(Boolean))];
        return NextResponse.json({ error: 'validation', fields }, { status: 400 });
    }
    const data = parsed.data;

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const timestamp = new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Paris' });

        // 4. Email to Patrick (French). A failure is a failure for the visitor.
        const { error } = await resend.emails.send({
            from: FROM,
            to: [ADMIN],
            subject: `Nouveau message de ${singleLine(data.name, 100)}`,
            react: SimpleContactNotification({ name: data.name, email: data.email, message: data.message, locale: data.locale, timestamp }),
            replyTo: data.email,
        });
        if (error) {
            console.error('contact-simple: admin email failed', { type: error.name });
            return NextResponse.json({ error: 'send_failed' }, { status: 500 });
        }

        // 5. Confirmation to the visitor (own language), capped per address and overall.
        //    A failure is only logged. Over the cap: Patrick still has the message.
        try {
            if (!confirmationGate(data.email)) {
                console.warn('contact-simple: visitor email skipped (cap)');
                return NextResponse.json({ success: true }, { status: 200 });
            }
            const { error: clientError } = await resend.emails.send({
                from: FROM,
                to: [data.email],
                subject: simpleConfirmationSubject[data.locale],
                react: SimpleContactConfirmation({ name: safeDisplayName(data.name), locale: data.locale }),
            });
            if (clientError) console.error('contact-simple: visitor email failed', { type: clientError.name });
        } catch (clientError) {
            console.error('contact-simple: visitor email failed', { type: clientError instanceof Error ? clientError.name : 'unknown' });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('contact-simple: unexpected error', { type: error instanceof Error ? error.name : 'unknown' });
        return NextResponse.json({ error: 'send_failed' }, { status: 500 });
    }
}
