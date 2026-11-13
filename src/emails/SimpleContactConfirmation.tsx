import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

// Email clients cannot read CSS tokens: these are the only hard-coded colours of the project.
const INK = '#0B0B0A';
const BONE = '#ECE7DE';
const ACCENT = '#EC2A45';
const LINE = '#2A2927';

type Locale = 'fr' | 'en' | 'pl';

export interface SimpleContactConfirmationProps {
    /** Only pass a name that went through safeDisplayName. */
    name?: string;
    locale?: Locale;
}

export const simpleConfirmationSubject: Record<Locale, string> = {
    fr: 'Message bien reçu',
    en: 'Message received',
    pl: 'Wiadomość otrzymana',
};

const COPY: Record<Locale, { preview: string; greeting: (n?: string) => string; body: string; reply: string; signoff: string }> = {
    fr: {
        preview: 'Votre message est bien reçu.',
        greeting: (n) => (n ? `Bonjour ${n},` : 'Bonjour,'),
        body: 'Merci pour votre message : je l\'ai bien reçu.',
        reply: 'Je vous réponds sous 48 heures ouvrées.',
        signoff: 'À très vite,',
    },
    en: {
        preview: 'Your message has arrived.',
        greeting: (n) => (n ? `Hi ${n},` : 'Hi,'),
        body: 'Thanks for your message: it reached me.',
        reply: 'I will reply within 48 working hours.',
        signoff: 'Speak soon,',
    },
    pl: {
        preview: 'Twoja wiadomość dotarła.',
        greeting: (n) => (n ? `Cześć ${n},` : 'Cześć,'),
        body: 'Dziękuję za wiadomość: dotarła do mnie.',
        reply: 'Odpowiem w ciągu 48 godzin roboczych.',
        signoff: 'Do usłyszenia,',
    },
};

export const SimpleContactConfirmation = ({ name, locale = 'fr' }: SimpleContactConfirmationProps) => {
    const t = COPY[locale];
    return (
        <Html lang={locale}>
            <Head />
            <Preview>{t.preview}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={content}>
                        <Heading style={h1}>{t.greeting(name)}</Heading>
                        <Text style={paragraph}>{t.body}</Text>
                        <Text style={paragraph}>{t.reply}</Text>
                        <Text style={{ ...paragraph, marginTop: '24px' }}>{t.signoff}</Text>
                        <Text style={sign}>Patrick Bartosik</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default SimpleContactConfirmation;

const main = { backgroundColor: INK, fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: '24px 0' };
const container = { maxWidth: '560px', margin: '0 auto', backgroundColor: INK, border: `1px solid ${LINE}` };
const content = { padding: '32px 28px' };
const h1 = { color: BONE, fontSize: '22px', margin: '0 0 12px' };
const paragraph = { color: BONE, fontSize: '15px', lineHeight: '1.6', margin: '0 0 10px' };
const sign = { color: ACCENT, fontSize: '15px', fontWeight: 700, margin: 0 };
