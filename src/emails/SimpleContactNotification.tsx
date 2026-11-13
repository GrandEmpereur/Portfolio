import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

// Email clients cannot read CSS tokens: these are the only hard-coded colours of the project.
const INK = '#0B0B0A';
const BONE = '#ECE7DE';
const ACCENT = '#EC2A45';
const MUTED = '#9E9A92';
const LINE = '#2A2927';

const LOCALE_FR = { fr: 'Français', en: 'Anglais', pl: 'Polonais' } as const;

export interface SimpleContactNotificationProps {
    name: string;
    email: string;
    message: string;
    locale: 'fr' | 'en' | 'pl';
    timestamp?: string;
}

export const SimpleContactNotification = ({ name, email, message, locale, timestamp }: SimpleContactNotificationProps) => (
    <Html lang="fr">
        <Head />
        <Preview>{`Nouveau message de ${name}`}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={content}>
                    <Text style={badge}>MESSAGE DIRECT</Text>
                    <Heading style={h1}>{`Nouveau message de ${name}`}</Heading>
                    {timestamp ? <Text style={meta}>{timestamp}</Text> : null}
                    <Hr style={hr} />
                    <Text style={label}>E-mail</Text>
                    <Text style={value}>{email}</Text>
                    <Text style={label}>Langue du visiteur</Text>
                    <Text style={value}>{LOCALE_FR[locale]}</Text>
                    <Text style={label}>Message</Text>
                    <Text style={{ ...value, whiteSpace: 'pre-wrap' as const }}>{message}</Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default SimpleContactNotification;

const main = { backgroundColor: INK, fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: '24px 0' };
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: INK, border: `1px solid ${LINE}` };
const content = { padding: '28px' };
const badge = { color: ACCENT, fontSize: '12px', letterSpacing: '0.1em', fontWeight: 700, margin: '0 0 8px' };
const h1 = { color: BONE, fontSize: '22px', lineHeight: '1.25', margin: 0 };
const meta = { color: MUTED, fontSize: '12px', margin: '6px 0 0' };
const hr = { borderColor: LINE, margin: '16px 0' };
const label = { color: MUTED, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '12px 0 2px' };
const value = { color: BONE, fontSize: '15px', lineHeight: '1.5', margin: 0 };
