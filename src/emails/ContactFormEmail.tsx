import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

// Email clients cannot read CSS tokens: these are the only hard-coded colours of the project.
const INK = '#0B0B0A';
const BONE = '#ECE7DE';
const ACCENT = '#EC2A45';
const MUTED = '#9E9A92';
const LINE = '#2A2927';

type Need = 'llm' | 'agent' | 'rag' | 'saas' | 'site' | 'refonte' | 'avis';

export interface ContactFormEmailProps {
    needs: readonly Need[];
    stage: 'idee' | 'specs' | 'existant' | 'renfort';
    timing: 'asap' | 'mois' | 'trimestre' | 'plus-tard';
    budget: 'valide' | 'enveloppe' | 'inconnu';
    budgetAmount?: string;
    message: string;
    link?: string;
    firstName: string;
    lastName?: string;
    email: string;
    company?: string;
    phone?: string;
    channel: 'email' | 'visio' | 'tel';
    locale: 'fr' | 'en' | 'pl';
    leadScore: number;
    leadCategory: 'hot' | 'warm' | 'cold';
}

const NEEDS_FR: Record<Need, string> = {
    llm: 'LLM / IA générative',
    agent: 'Agent IA',
    rag: 'RAG / base de connaissances',
    saas: 'SaaS',
    site: 'Site web',
    refonte: 'Refonte',
    avis: 'Avis / audit',
};
const STAGE_FR = { idee: 'Une idée', specs: 'Cahier des charges prêt', existant: 'Un existant à reprendre', renfort: 'Renfort d\'équipe' } as const;
const TIMING_FR = { asap: 'Dès que possible', mois: 'Dans le mois', trimestre: 'Dans le trimestre', 'plus-tard': 'Plus tard' } as const;
const BUDGET_FR = { valide: 'Budget validé', enveloppe: 'Enveloppe en tête', inconnu: 'Pas encore défini' } as const;
const CHANNEL_FR = { email: 'E-mail', visio: 'Visio', tel: 'Téléphone' } as const;
const LEVEL_FR = { hot: 'CHAUD', warm: 'TIÈDE', cold: 'FROID' } as const;
const LOCALE_FR = { fr: 'Français', en: 'Anglais', pl: 'Polonais' } as const;

const Row = ({ label, value }: { label: string; value: string }) => (
    <Section style={row}>
        <Text style={labelStyle}>{label}</Text>
        <Text style={valueStyle}>{value}</Text>
    </Section>
);

export const ContactFormEmail = (p: ContactFormEmailProps) => {
    const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ');
    const budget = p.budgetAmount ? `${BUDGET_FR[p.budget]} (${p.budgetAmount})` : BUDGET_FR[p.budget];

    return (
        <Html lang="fr">
            <Head />
            <Preview>{`Demande ${LEVEL_FR[p.leadCategory]} de ${fullName}`}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Text style={badge}>{`${LEVEL_FR[p.leadCategory]} · ${p.leadScore}/100`}</Text>
                        <Heading style={h1}>{`Nouvelle demande de ${fullName}`}</Heading>
                    </Section>

                    <Section style={content}>
                        <Row label="Besoins" value={p.needs.map((n) => NEEDS_FR[n]).join(', ')} />
                        <Row label="Avancement" value={STAGE_FR[p.stage]} />
                        <Row label="Démarrage" value={TIMING_FR[p.timing]} />
                        <Row label="Budget déclaré" value={budget} />
                        <Hr style={hr} />
                        <Section style={row}>
                            <Text style={labelStyle}>Message</Text>
                            <Text style={messageStyle}>{p.message}</Text>
                        </Section>
                        {p.link ? <Row label="Lien" value={p.link} /> : null}
                        <Hr style={hr} />
                        <Row label="Nom" value={fullName} />
                        <Row label="E-mail" value={p.email} />
                        {p.company ? <Row label="Société" value={p.company} /> : null}
                        {p.phone ? <Row label="Téléphone" value={p.phone} /> : null}
                        <Row label="Moyen de contact préféré" value={CHANNEL_FR[p.channel]} />
                        <Row label="Langue du visiteur" value={LOCALE_FR[p.locale]} />
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ContactFormEmail;

const main = { backgroundColor: INK, fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: '24px 0' };
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: INK, border: `1px solid ${LINE}` };
const header = { padding: '28px 28px 8px' };
const badge = { color: ACCENT, fontSize: '12px', letterSpacing: '0.1em', fontWeight: 700, margin: '0 0 8px' };
const h1 = { color: BONE, fontSize: '22px', lineHeight: '1.25', margin: 0 };
const content = { padding: '12px 28px 28px' };
const row = { margin: '0 0 12px' };
const labelStyle = { color: MUTED, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 2px' };
const valueStyle = { color: BONE, fontSize: '15px', lineHeight: '1.5', margin: 0 };
const messageStyle = { ...valueStyle, whiteSpace: 'pre-wrap' as const };
const hr = { borderColor: LINE, margin: '16px 0' };
