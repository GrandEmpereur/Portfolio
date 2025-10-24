import { ContactFormEmail } from './ContactFormEmail';

// Fichier de preview pour React Email
// Pour lancer le serveur de preview : bun email

// Exemple de données pour la preview
const PreviewContactFormEmail = () => (
    <ContactFormEmail
        name="Sophie Martin"
        email="sophie.martin@example.com"
        message="Hello Patrick,

I came across your portfolio and I'm very impressed by your work, particularly your e-commerce projects.

I'm the CEO of a growing startup and we're looking for a talented Full Stack Developer to build our SaaS platform. The project involves:
- Modern React/Next.js frontend
- Scalable backend architecture
- Payment integration (Stripe/Lemon Squeezy)
- Real-time features

Would you be available for a call next week to discuss this opportunity in more detail?

Best regards,
Sophie"
    />
);

export default PreviewContactFormEmail;

