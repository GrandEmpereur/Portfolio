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

interface SimpleContactConfirmationProps {
    name: string;
}

export const SimpleContactConfirmation = ({
    name,
}: SimpleContactConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>Merci pour votre message - Patrick Bartosik</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={logoText}>Patrick Bartosik</Heading>
                        <Text style={subtitle}>Développeur Full-Stack</Text>
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading style={h1}>Merci {name} ! 👋</Heading>

                        <Text style={text}>
                            J'ai bien reçu votre message et je vous remercie de l'intérêt que vous portez à mes services.
                        </Text>

                        <Text style={text}>
                            Je prends le temps d'étudier attentivement chaque demande et je vous répondrai dans les <strong>24-48 heures</strong>.
                        </Text>

                        <Section style={highlightBox}>
                            <Text style={highlightText}>
                                💡 En attendant, n'hésitez pas à consulter mon portfolio pour découvrir mes réalisations récentes.
                            </Text>
                        </Section>

                        <Text style={text}>
                            À très bientôt,<br />
                            <strong>Patrick Bartosik</strong>
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            Patrick Bartosik - Développeur Full-Stack E-commerce & Shopify Plus
                        </Text>
                        <Text style={footerText}>
                            🌐 <a href="https://patrickbartosik.com" style={link}>patrickbartosik.com</a>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default SimpleContactConfirmation;

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
};

const header = {
    padding: '32px 40px',
    textAlign: 'center' as const,
    backgroundColor: '#000000',
};

const logoText = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0',
    padding: '0',
    letterSpacing: '-0.5px',
};

const subtitle = {
    color: '#f97316',
    fontSize: '14px',
    fontWeight: '500',
    margin: '8px 0 0',
    padding: '0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const content = {
    padding: '40px 40px',
};

const h1 = {
    color: '#1a1a1a',
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 24px',
    padding: '0',
    lineHeight: '1.2',
};

const text = {
    color: '#4a5568',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px',
};

const highlightBox = {
    backgroundColor: '#fff7ed',
    border: '2px solid #fed7aa',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
};

const highlightText = {
    color: '#ea580c',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0',
    fontWeight: '500',
};

const hr = {
    borderColor: '#e2e8f0',
    margin: '32px 0',
};

const footer = {
    padding: '0 40px',
    textAlign: 'center' as const,
};

const footerText = {
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '4px 0',
};

const link = {
    color: '#f97316',
    textDecoration: 'none',
};

