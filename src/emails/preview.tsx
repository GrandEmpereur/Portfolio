import { ContactFormEmail } from './ContactFormEmail';

// React Email preview file. Run the preview server with: bun email

const PreviewContactFormEmail = () => (
    <ContactFormEmail
        needs={['agent', 'rag']}
        stage="specs"
        timing="mois"
        budget="enveloppe"
        budgetAmount="Environ la moitié d'un budget annuel outillage"
        message={'Bonjour Patrick,\n\nNous voulons un agent qui répond aux questions de nos équipes support à partir de notre base documentaire.\n\nSeriez-vous disponible pour un appel la semaine prochaine ?'}
        link="https://exemple.test/cahier-des-charges"
        firstName="Sophie"
        lastName="Martin"
        email="sophie.martin@exemple.test"
        company="Atelier Test"
        phone="+33 6 12 34 56 78"
        channel="visio"
        locale="fr"
        leadScore={85}
        leadCategory="hot"
    />
);

export default PreviewContactFormEmail;
