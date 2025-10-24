import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Hr,
} from '@react-email/components';

interface ContactFormEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    companyName: string;
    companyWebsite?: string;
    serviceType: string;
    ecommerceCms?: string;
    helpType: string;
    budgetMin: number;
    budgetMax: number;
    discoverySource: string;
    discoverySourceOther?: string;
    message?: string;
    leadScore?: number;
    leadCategory?: string;
}

export const ContactFormEmail = ({
    firstName,
    lastName,
    email,
    phone,
    companyName,
    companyWebsite,
    serviceType,
    ecommerceCms,
    helpType,
    budgetMin,
    budgetMax,
    discoverySource,
    discoverySourceOther,
    message,
    leadScore,
    leadCategory,
}: ContactFormEmailProps) => {
    const name = `${firstName} ${lastName}`;
    const previewText = `🚀 [${leadCategory?.toUpperCase()}] New ${serviceType} project from ${firstName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={logo}>Patrick Bartosik®</Heading>
                        <Text style={tagline}>Full Stack Developer</Text>
                    </Section>

                    {/* Lead Score Badge */}
                    {leadScore !== undefined && (
                        <Section style={alertSection}>
                            <Text style={{
                                ...alertBadge,
                                backgroundColor: leadCategory === 'hot' ? '#10b981' : leadCategory === 'warm' ? '#f59e0b' : '#6b7280',
                            }}>
                                {leadCategory === 'hot' && '🔥'}
                                {leadCategory === 'warm' && '⚡'}
                                {leadCategory === 'cold' && '❄️'}
                                {' '}
                                Lead Score: {leadScore}/100 ({leadCategory?.toUpperCase()})
                            </Text>
                        </Section>
                    )}

                    {/* Main Content */}
                    <Section style={contentSection}>
                        <Heading style={mainHeading}>
                            Nouveau projet {serviceType} de {name}
                        </Heading>

                        {/* Contact Info */}
                        <Section style={infoCard}>
                            <Row>
                                <Text style={infoLabel}>Contact</Text>
                            </Row>
                            <Row style={infoRow}>
                                <Text style={infoKey}>Nom:</Text>
                                <Text style={infoValue}>{name}</Text>
                            </Row>
                            <Row style={infoRow}>
                                <Text style={infoKey}>Email:</Text>
                                <Link href={`mailto:${email}`} style={emailLink}>
                                    {email}
                                </Link>
                            </Row>
                            {phone && (
                                <Row style={infoRow}>
                                    <Text style={infoKey}>Téléphone:</Text>
                                    <Link href={`tel:${phone}`} style={emailLink}>
                                        {phone}
                                    </Link>
                                </Row>
                            )}
                        </Section>

                        {/* Company Info */}
                        <Section style={infoCard}>
                            <Row>
                                <Text style={infoLabel}>Entreprise</Text>
                            </Row>
                            <Row style={infoRow}>
                                <Text style={infoKey}>Marque:</Text>
                                <Text style={infoValue}>{companyName}</Text>
                            </Row>
                            {companyWebsite && (
                                <Row style={infoRow}>
                                    <Text style={infoKey}>Site:</Text>
                                    <Link href={companyWebsite} style={emailLink}>
                                        {companyWebsite}
                                    </Link>
                                </Row>
                            )}
                        </Section>

                        {/* Project Details */}
                        <Section style={projectCard}>
                            <Row>
                                <Text style={infoLabel}>Détails du Projet</Text>
                            </Row>
                            <Row style={infoRow}>
                                <Text style={infoKey}>Service:</Text>
                                <Text style={infoValue}>
                                    {serviceType === "web" && "🌐 Site Web"}
                                    {serviceType === "saas" && "⚡ SaaS"}
                                    {serviceType === "ecommerce" && "🛍️ E-commerce"}
                                    {serviceType === "mobile" && "📱 Mobile"}
                                    {serviceType === "autre" && "✨ Autre"}
                                </Text>
                            </Row>
                            {ecommerceCms && (
                                <Row style={infoRow}>
                                    <Text style={infoKey}>CMS:</Text>
                                    <Text style={infoValue}>{ecommerceCms}</Text>
                                </Row>
                            )}
                            <Row style={infoRow}>
                                <Text style={infoKey}>Besoin:</Text>
                                <Text style={infoValue}>
                                    {helpType === "refonte" && "🔄 Refonte"}
                                    {helpType === "creation" && "✨ Création"}
                                    {helpType === "ui-ux" && "🎨 UI/UX Design"}
                                    {helpType === "dev-integration" && "⚙️ Développement"}
                                    {helpType === "autre" && "💡 Autre"}
                                </Text>
                            </Row>
                            <Row style={infoRow}>
                                <Text style={infoKey}>Budget:</Text>
                                <Text style={infoValue}>
                                    {budgetMin.toLocaleString()}€ - {budgetMax.toLocaleString()}€
                                </Text>
                            </Row>
                            <Row style={infoRow}>
                                <Text style={infoKey}>Découverte:</Text>
                                <Text style={infoValue}>
                                    {discoverySource === "google" && "🔍 Google"}
                                    {discoverySource === "social" && "📱 Réseaux sociaux"}
                                    {discoverySource === "recommendation" && "👥 Recommandation"}
                                    {discoverySource === "event" && "🎪 Événement"}
                                    {discoverySource === "autre" && discoverySourceOther ? `✨ ${discoverySourceOther}` : "✨ Autre"}
                                </Text>
                            </Row>
                        </Section>

                        {/* Message */}
                        {message && (
                            <Section>
                                <Text style={messageLabel}>Message:</Text>
                                <Section style={messageBox}>
                                    <Text style={messageText}>{message}</Text>
                                </Section>
                            </Section>
                        )}

                        {/* CTA */}
                        <Section style={buttonSection}>
                            <Button href={`mailto:${email}`} style={button}>
                                Répondre à {firstName}
                            </Button>
                        </Section>
                    </Section>

                    <Hr style={hr} />

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            Email envoyé automatiquement depuis votre formulaire de contact.
                        </Text>
                        <Text style={footerText}>
                            bartosik.fr • Full Stack Developer • France
                        </Text>
                        <Text style={copyright}>
                            © {new Date().getFullYear()} Patrick Bartosik®. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '580px',
    maxWidth: '100%',
};

const header = {
    padding: '32px 48px 24px',
    textAlign: 'center' as const,
    backgroundColor: '#0A0A0A',
};

const logo = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
};

const tagline = {
    fontSize: '14px',
    color: '#ffffff',
    opacity: 0.7,
    margin: '0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const alertSection = {
    padding: '24px 48px 0',
    textAlign: 'center' as const,
};

const alertBadge = {
    display: 'inline-block',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '20px',
    margin: '0',
};

const contentSection = {
    padding: '32px 48px',
};

const mainHeading = {
    fontSize: '28px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 32px',
};

const infoCard = {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
    border: '1px solid #e9ecef',
};

const projectCard = {
    backgroundColor: '#fff5f0',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
    border: '2px solid #FF4925',
};

const infoLabel = {
    fontSize: '12px',
    fontWeight: '700',
    color: '#6c757d',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 16px',
};

const infoRow = {
    marginBottom: '12px',
};

const infoKey = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#495057',
    margin: '0',
    display: 'inline-block',
    width: '100px',
};

const infoValue = {
    fontSize: '16px',
    color: '#1a1a1a',
    margin: '0',
    display: 'inline-block',
    fontWeight: '500',
};

const emailLink = {
    fontSize: '16px',
    color: '#FF4925',
    textDecoration: 'none',
    fontWeight: '500',
};

const messageLabel = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#495057',
    margin: '0 0 12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const messageBox = {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
    border: '1px solid #e9ecef',
};

const messageText = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#1a1a1a',
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
};

const buttonSection = {
    textAlign: 'center' as const,
    marginTop: '32px',
};

const button = {
    backgroundColor: '#0A0A0A',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '14px 32px',
};

const hr = {
    borderColor: '#e9ecef',
    margin: '0',
};

const footer = {
    padding: '24px 48px',
    textAlign: 'center' as const,
};

const footerText = {
    fontSize: '14px',
    color: '#6c757d',
    lineHeight: '1.5',
    margin: '4px 0',
};

const copyright = {
    fontSize: '12px',
    color: '#adb5bd',
    margin: '16px 0 0',
};

export default ContactFormEmail;

