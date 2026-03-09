import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema, calculateLeadScore, categorizeLead, type ContactFormData } from '@/lib/contact-schema';
import { ContactFormEmail } from '@/emails/ContactFormEmail';
import { ContactFormConfirmation } from '@/emails/ContactFormConfirmation';

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

        // 1. Email de notification à l'admin (avec lead score)
        const { data: emailResult, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Patrick Bartosik <contact@bartosik.fr>',
            to: [process.env.RESEND_ADMIN_EMAIL || 'contact@bartosik.fr'],
            subject,
            react: ContactFormEmail({
                ...data,
                leadScore,
                leadCategory,
            }),
            replyTo: data.email,
        });

        if (error) {
            console.error('Resend error (admin):', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        // 2. Email de confirmation au client
        const { error: clientError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Patrick Bartosik <contact@bartosik.fr>',
            to: [data.email],
            subject: '✅ Demande de projet bien reçue - Patrick Bartosik',
            react: ContactFormConfirmation({
                firstName: data.firstName,
                lastName: data.lastName,
                companyName: data.companyName,
                serviceType: data.serviceType,
                budgetMin: data.budgetMin,
                budgetMax: data.budgetMax,
            }),
        });

        if (clientError) {
            console.error('Resend error (client):', clientError);
            // On continue quand même car l'email admin est envoyé
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Merci ! Votre message a été envoyé avec succès.',
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
