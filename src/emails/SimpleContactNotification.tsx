import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
} from '@react-email/components';
import * as React from 'react';

interface SimpleContactNotificationProps {
    name: string;
    email: string;
    message: string;
    timestamp?: string;
}

export const SimpleContactNotification = ({
    name,
    email,
    message,
    timestamp,
}: SimpleContactNotificationProps) => {
    const formattedDate = timestamp || new Date().toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    return (
        <Html>
            <Head />
            <Preview>Nouveau message de contact - {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={h1}>📬 Nouveau message de contact</Heading>
                        <Text style={timestampStyle}>{formattedDate}</Text>
                    </Section>

                    {/* Contact Info */}
                    <Section style={content}>
                        <Section style={infoBox}>
                            <Text style={label}>Nom</Text>
                            <Text style={value}>{name}</Text>
                        </Section>

                        <Section style={infoBox}>
                            <Text style={label}>Email</Text>
                            <Text style={value}>
                                <a href={`mailto:${email}`} style={emailLink}>{email}</a>
                            </Text>
                        </Section>

                        <Hr style={hr} />

                        <Section style={messageBox}>
                            <Text style={label}>Message</Text>
                            <Text style={messageText}>{message}</Text>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            💡 Répondre sous 24-48h pour maintenir un bon taux de réponse
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default SimpleContactNotification;

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
};

const header = {
    padding: '32px 40px 24px',
    backgroundColor: '#0f172a',
    textAlign: 'center' as const,
};

const h1 = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 8px',
    padding: '0',
};

const timestampStyle = {
    color: '#94a3b8',
    fontSize: '13px',
    margin: '0',
};

const content = {
    padding: '32px 40px',
};

const infoBox = {
    marginBottom: '20px',
};

const label = {
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 8px',
};

const value = {
    color: '#1e293b',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0',
};

const emailLink = {
    color: '#f97316',
    textDecoration: 'none',
    fontWeight: '600',
};

const hr = {
    borderColor: '#e2e8f0',
    margin: '24px 0',
};

const messageBox = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '20px',
};

const messageText = {
    color: '#334155',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0',
};

const footer = {
    padding: '0 40px 24px',
    textAlign: 'center' as const,
};

const footerText = {
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0',
};

