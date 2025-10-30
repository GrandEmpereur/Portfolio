import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { simpleContactSchema, type SimpleContactData } from '@/lib/simple-contact-schema';
import { SimpleContactConfirmation } from '@/emails/SimpleContactConfirmation';
import { SimpleContactNotification } from '@/emails/SimpleContactNotification';

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
                { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
                { status: 429 }
            );
        }

        // Parse body
        const body = await request.json();

        // Honeypot check
        if (body.honeypot && body.honeypot !== '') {
            console.warn('Honeypot triggered:', ip);
            return NextResponse.json(
                { success: true, message: 'Message envoyé avec succès' },
                { status: 200 }
            );
        }

        // Validation Zod
        const validationResult = simpleContactSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: 'Validation échouée',
                    details: validationResult.error.format()
                },
                { status: 400 }
            );
        }

        const data: SimpleContactData = validationResult.data;

        console.log(`Nouveau message de contact simple de ${data.name}:`, {
            email: data.email,
            messageLength: data.message.length,
        });

        const timestamp = new Date().toLocaleString('fr-FR', {
            dateStyle: 'full',
            timeStyle: 'short',
        });

        // 1. Email de notification à l'admin
        const { error: adminError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Patrick Bartosik <contact@bartosik.fr>',
            to: [process.env.RESEND_ADMIN_EMAIL || 'contact@bartosik.fr'],
            subject: `📬 Nouveau message de ${data.name}`,
            react: SimpleContactNotification({
                name: data.name,
                email: data.email,
                message: data.message,
                timestamp,
            }),
            replyTo: data.email,
        });

        if (adminError) {
            console.error('Erreur envoi email admin:', adminError);
            return NextResponse.json(
                { error: 'Erreur lors de l\'envoi de l\'email' },
                { status: 500 }
            );
        }

        // 2. Email de confirmation au client
        const { error: clientError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Patrick Bartosik <contact@bartosik.fr>',
            to: [data.email],
            subject: '✅ Message bien reçu - Patrick Bartosik',
            react: SimpleContactConfirmation({
                name: data.name,
            }),
        });

        if (clientError) {
            console.error('Erreur envoi email client:', clientError);
            // On continue quand même car l'email admin est envoyé
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Merci ! Votre message a été envoyé avec succès. Je vous répondrai sous 24-48h.',
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erreur API contact-simple:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}

