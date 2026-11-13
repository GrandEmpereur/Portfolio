import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSourceSchema, singleLine } from '@/lib/contact-request';
import { contactRateLimit, getClientIp } from '@/lib/rate-limit';

const FROM = process.env.RESEND_FROM_EMAIL || 'Patrick Bartosik <contact@bartosik.fr>';
const ADMIN = process.env.RESEND_ADMIN_EMAIL || 'contact@bartosik.fr';

const isFilled = (body: unknown, key: string): boolean =>
    typeof body === 'object' && body !== null && typeof (body as Record<string, unknown>)[key] === 'string'
    && ((body as Record<string, string>)[key]).trim() !== '';

export async function POST(request: NextRequest) {
    // 1. Rate limit (same limiter as the two other contact routes)
    if (!contactRateLimit(getClientIp(request.headers))) {
        return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'validation', fields: [] }, { status: 400 });
    }

    // 2. Honeypot, if a bot fills it
    if (isFilled(body, 'website')) {
        return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. Validation
    const parsed = contactSourceSchema.safeParse(body);
    if (!parsed.success) {
        const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0] ?? '')).filter(Boolean))];
        return NextResponse.json({ error: 'validation', fields }, { status: 400 });
    }
    const { email, source } = parsed.data;

    // 4. One-line plain text email to Patrick
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
            from: FROM,
            to: [ADMIN],
            subject: `Source de la demande : ${source}`,
            text: `${singleLine(email, 255)} a connu le site via : ${source}`,
        });
        if (error) {
            console.error('contact-source: email failed', { type: error.name });
            return NextResponse.json({ error: 'send_failed' }, { status: 500 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('contact-source: unexpected error', { type: error instanceof Error ? error.name : 'unknown' });
        return NextResponse.json({ error: 'send_failed' }, { status: 500 });
    }
}
