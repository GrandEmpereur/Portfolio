import { SimpleContactForm } from "@/components/SimpleContactForm";

export const metadata = {
    title: "Contact - Patrick Bartosik",
    description: "Parlons de votre projet",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black">
            <SimpleContactForm />
        </main>
    );
}

