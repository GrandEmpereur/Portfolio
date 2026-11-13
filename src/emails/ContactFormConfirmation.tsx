import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

// Email clients cannot read CSS tokens: these are the only hard-coded colours of the project.
const INK = '#0B0B0A';
const BONE = '#ECE7DE';
const ACCENT = '#EC2A45';
const MUTED = '#9E9A92';
const LINE = '#2A2927';

type Locale = 'fr' | 'en' | 'pl';
type Need = 'llm' | 'agent' | 'rag' | 'saas' | 'site' | 'refonte' | 'avis';

export interface ContactFormConfirmationProps {
    firstName: string;
    needs: readonly Need[];
    locale: Locale;
}

interface Copy {
    preview: string;
    greeting: (name: string) => string;
    intro: string;
    recap: string;
    stepsTitle: string;
    steps: readonly [string, string, string];
    signoff: string;
    needs: Record<Need, string>;
}

export const confirmationSubject: Record<Locale, string> = {
    fr: 'C\'est noté, votre demande est bien reçue',
    en: 'Got it, your request has arrived',
    pl: 'Przyjęte, Twoje zapytanie dotarło',
};

const COPY: Record<Locale, Copy> = {
    fr: {
        preview: 'Votre demande est bien reçue.',
        greeting: (n) => `Bonjour ${n},`,
        intro: 'Merci pour votre message : je l\'ai bien reçu et je le lis personnellement.',
        recap: 'Votre besoin',
        stepsTitle: 'Les trois prochaines étapes',
        steps: [
            'Je lis votre demande et je prépare mes questions.',
            'Je vous réponds sous 48 heures ouvrées, par le moyen que vous avez choisi.',
            'Nous échangeons pour cadrer le projet, sans engagement.',
        ],
        signoff: 'À très vite,',
        needs: { llm: 'LLM / IA générative', agent: 'Agent IA', rag: 'RAG / base de connaissances', saas: 'SaaS', site: 'Site web', refonte: 'Refonte', avis: 'Avis / audit' },
    },
    en: {
        preview: 'Your request has arrived.',
        greeting: (n) => `Hi ${n},`,
        intro: 'Thanks for your message: it reached me and I read it personally.',
        recap: 'Your need',
        stepsTitle: 'The next three steps',
        steps: [
            'I read your request and prepare my questions.',
            'I reply within 48 working hours, through the channel you picked.',
            'We talk to scope the project, no commitment.',
        ],
        signoff: 'Speak soon,',
        needs: { llm: 'LLM / generative AI', agent: 'AI agent', rag: 'RAG / knowledge base', saas: 'SaaS', site: 'Website', refonte: 'Redesign', avis: 'Advice / audit' },
    },
    pl: {
        preview: 'Twoje zapytanie dotarło.',
        greeting: (n) => `Cześć ${n},`,
        intro: 'Dziękuję za wiadomość: dotarła do mnie i czytam ją osobiście.',
        recap: 'Twoja potrzeba',
        stepsTitle: 'Trzy kolejne kroki',
        steps: [
            'Czytam Twoje zapytanie i przygotowuję pytania.',
            'Odpowiadam w ciągu 48 godzin roboczych, wybranym przez Ciebie kanałem.',
            'Rozmawiamy, żeby określić zakres projektu, bez zobowiązań.',
        ],
        signoff: 'Do usłyszenia,',
        needs: { llm: 'LLM / generatywna AI', agent: 'Agent AI', rag: 'RAG / baza wiedzy', saas: 'SaaS', site: 'Strona internetowa', refonte: 'Przebudowa', avis: 'Doradztwo / audyt' },
    },
};

export const ContactFormConfirmation = ({ firstName, needs, locale }: ContactFormConfirmationProps) => {
    const t = COPY[locale];
    return (
        <Html lang={locale}>
            <Head />
            <Preview>{t.preview}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={content}>
                        <Heading style={h1}>{t.greeting(firstName)}</Heading>
                        <Text style={paragraph}>{t.intro}</Text>

                        <Text style={label}>{t.recap}</Text>
                        <Text style={paragraph}>{needs.map((n) => t.needs[n]).join(', ')}</Text>

                        <Text style={label}>{t.stepsTitle}</Text>
                        {t.steps.map((step, i) => (
                            <Text key={step} style={paragraph}>
                                <span style={num}>{`0${i + 1}`}</span>
                                {` ${step}`}
                            </Text>
                        ))}

                        <Text style={{ ...paragraph, marginTop: '24px' }}>{t.signoff}</Text>
                        <Text style={sign}>Patrick Bartosik</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ContactFormConfirmation;

const main = { backgroundColor: INK, fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: '24px 0' };
const container = { maxWidth: '560px', margin: '0 auto', backgroundColor: INK, border: `1px solid ${LINE}` };
const content = { padding: '32px 28px' };
const h1 = { color: BONE, fontSize: '22px', margin: '0 0 12px' };
const paragraph = { color: BONE, fontSize: '15px', lineHeight: '1.6', margin: '0 0 10px' };
const label = { color: MUTED, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '20px 0 4px' };
const num = { color: ACCENT, fontWeight: 700 };
const sign = { color: ACCENT, fontSize: '15px', fontWeight: 700, margin: 0 };
