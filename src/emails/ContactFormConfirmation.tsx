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

interface ContactFormConfirmationProps {
    firstName: string;
    lastName: string;
    companyName: string;
    serviceType: string;
    budgetMin?: number;
    budgetMax?: number;
}

export const ContactFormConfirmation = ({
    firstName,
    lastName,
    companyName,
    serviceType,
    budgetMin,
    budgetMax,
}: ContactFormConfirmationProps) => {
    const serviceLabels: Record<string, string> = {
        web: '🌐 Site Web',
        saas: '⚡ SaaS',
        ecommerce: '🛍️ E-commerce',
        mobile: '📱 Application Mobile',
        autre: '✨ Autre',
    };

    return (
        <Html>
            <Head />
            <Preview>Demande de projet bien reçue - Patrick Bartosik</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={logoText}>Patrick Bartosik</Heading>
                        <Text style={subtitle}>Développeur Full-Stack E-commerce & Shopify Plus</Text>
                    </Section>

                    {/* Success Badge */}
                    <Section style={badgeSection}>
                        <div style={successBadge}>
                            ✅ Demande bien reçue
                        </div>
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading style={h1}>Merci {firstName} ! 🚀</Heading>

                        <Text style={text}>
                            Votre demande de projet a bien été enregistrée. Je suis ravi de l'intérêt que vous portez à mes services pour <strong>{companyName}</strong>.
                        </Text>

                        {/* Project Summary */}
                        <Section style={summaryBox}>
                            <Heading style={h2}>📋 Résumé de votre demande</Heading>

                            <Section style={summaryItem}>
                                <Text style={summaryLabel}>Contact</Text>
                                <Text style={summaryValue}>{firstName} {lastName}</Text>
                            </Section>

                            <Section style={summaryItem}>
                                <Text style={summaryLabel}>Entreprise</Text>
                                <Text style={summaryValue}>{companyName}</Text>
                            </Section>

                            <Section style={summaryItem}>
                                <Text style={summaryLabel}>Type de projet</Text>
                                <Text style={summaryValue}>{serviceLabels[serviceType] || serviceType}</Text>
                            </Section>

                            {budgetMin && budgetMax && (
                                <Section style={summaryItem}>
                                    <Text style={summaryLabel}>Budget estimé</Text>
                                    <Text style={summaryValue}>
                                        {budgetMin.toLocaleString('fr-FR')}€ - {budgetMax.toLocaleString('fr-FR')}€
                                    </Text>
                                </Section>
                            )}
                        </Section>

                        {/* Next Steps */}
                        <Section style={stepsBox}>
                            <Heading style={h3}>🎯 Prochaines étapes</Heading>

                            <Text style={stepText}>
                                <strong>1. Analyse de votre demande</strong><br />
                                Je vais étudier en détail votre projet et vos besoins spécifiques.
                            </Text>

                            <Text style={stepText}>
                                <strong>2. Proposition personnalisée</strong><br />
                                Je vous enverrai une réponse détaillée sous 24-48h avec mes recommandations.
                            </Text>

                            <Text style={stepText}>
                                <strong>3. Échange téléphonique</strong><br />
                                Si votre projet correspond à mes expertises, nous planifierons un appel pour en discuter.
                            </Text>
                        </Section>

                        <Hr style={hr} />

                        <Text style={text}>
                            En attendant ma réponse, n'hésitez pas à consulter mes réalisations récentes sur mon portfolio.
                        </Text>

                        <Text style={signature}>
                            À très bientôt,<br />
                            <strong>Patrick Bartosik</strong><br />
                            <span style={signatureRole}>Développeur Full-Stack E-commerce</span>
                        </Text>
                    </Section>

                    <Hr style={footerHr} />

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            📧 contact@bartosik.fr<br />
                            🌐 <a href="https://patrickbartosik.com" style={link}>patrickbartosik.com</a>
                        </Text>
                        <Text style={footerNote}>
                            💡 Ce message est envoyé automatiquement suite à votre demande de contact.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ContactFormConfirmation;

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '0',
    marginBottom: '64px',
    maxWidth: '600px',
};

const header = {
    padding: '40px 40px 32px',
    textAlign: 'center' as const,
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
};

const logoText = {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: '700',
    margin: '0',
    padding: '0',
    letterSpacing: '-0.5px',
};

const subtitle = {
    color: '#f97316',
    fontSize: '14px',
    fontWeight: '500',
    margin: '12px 0 0',
    padding: '0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const badgeSection = {
    padding: '24px 40px 0',
    textAlign: 'center' as const,
};

const successBadge = {
    display: 'inline-block',
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '10px 20px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '600',
    border: '2px solid #86efac',
};

const content = {
    padding: '32px 40px 40px',
};

const h1 = {
    color: '#1a1a1a',
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 24px',
    padding: '0',
    lineHeight: '1.2',
};

const h2 = {
    color: '#1e293b',
    fontSize: '20px',
    fontWeight: '700',
    margin: '0 0 20px',
    padding: '0',
};

const h3 = {
    color: '#1e293b',
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 16px',
    padding: '0',
};

const text = {
    color: '#4a5568',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px',
};

const summaryBox = {
    backgroundColor: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 0',
};

const summaryItem = {
    marginBottom: '16px',
};

const summaryLabel = {
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 4px',
};

const summaryValue = {
    color: '#1e293b',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0',
};

const stepsBox = {
    backgroundColor: '#fff7ed',
    border: '2px solid #fed7aa',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 0',
};

const stepText = {
    color: '#78350f',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 16px',
};

const hr = {
    borderColor: '#e2e8f0',
    margin: '32px 0',
};

const footerHr = {
    borderColor: '#e2e8f0',
    margin: '0',
};

const signature = {
    color: '#1e293b',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '24px 0 0',
};

const signatureRole = {
    color: '#64748b',
    fontSize: '14px',
};

const footer = {
    padding: '32px 40px',
    textAlign: 'center' as const,
    backgroundColor: '#f8fafc',
};

const footerText = {
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.8',
    margin: '0 0 12px',
};

const footerNote = {
    color: '#94a3b8',
    fontSize: '12px',
    lineHeight: '1.6',
    margin: '0',
};

const link = {
    color: '#f97316',
    textDecoration: 'none',
    fontWeight: '600',
};

