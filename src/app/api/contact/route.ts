import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema, calculateLeadScore, categorizeLead, type ContactFormData } from '@/lib/contact-schema';
import { ContactFormEmail } from '@/emails/ContactFormEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting simple (en mémoire)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 heure

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (userLimit.count >= RATE_LIMIT) {
        return false;
    }

    userLimit.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse body
        const body = await request.json();

        // Honeypot check
        if (body.honeypot && body.honeypot !== '') {
            console.warn('Honeypot triggered:', ip);
            return NextResponse.json(
                { success: true, message: 'Email sent successfully' },
                { status: 200 }
            );
        }

        // Validation Zod
        const validationResult = contactFormSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: validationResult.error.format()
                },
                { status: 400 }
            );
        }

        const data: ContactFormData = validationResult.data;

        // Lead scoring
        const leadScore = calculateLeadScore(data);
        const leadCategory = categorizeLead(leadScore);

        console.log(`New contact from ${data.firstName} ${data.lastName}:`, {
            email: data.email,
            company: data.companyName,
            service: data.serviceType,
            leadScore,
            leadCategory,
        });

        // Sujet de l'email
        const subject = `🚀 [${leadCategory.toUpperCase()}] New ${data.serviceType} project from ${data.firstName} (${data.companyName})`;

        // Envoi email via Resend
        const { data: emailResult, error } = await resend.emails.send({
            from: 'Patrick Bartosik <contact@bartosik.fr>',
            to: [process.env.CONTACT_EMAIL || 'contact@bartosik.fr'],
            subject,
            react: ContactFormEmail({
                ...data,
                leadScore,
                leadCategory,
            }),
            replyTo: data.email,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Merci ! Votre message a été envoyé avec succès.',
                emailId: emailResult?.id,
                leadScore,
                leadCategory,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
