"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import {
    contactFormSchema,
    type ContactFormData,
    SERVICE_TYPES,
    ECOMMERCE_CMS,
    HELP_TYPES,
    DISCOVERY_SOURCES,
    calculateLeadScore,
    categorizeLead
} from "@/lib/contact-schema";
import { PhoneInput } from "@/components/form/PhoneInput";
import { BudgetSlider } from "@/components/form/BudgetSlider";
import { Honeypot } from "@/components/form/Honeypot";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export const SimpleContactForm = () => {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [startedAt] = useState(() => Date.now());
    const stepRef = useRef<HTMLDivElement>(null);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: undefined,
            companyName: "",
            companyWebsite: undefined,
            budgetMin: 5000,
            budgetMax: 15000,
            honeypot: "",
        },
        mode: "onBlur",
    });

    const { watch, setValue, register } = form;
    const serviceType = watch("serviceType");
    const discoverySource = watch("discoverySource");

    // Animation entre les steps
    useEffect(() => {
        if (stepRef.current) {
            gsap.fromTo(
                stepRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [currentStep]);

    const totalSteps = 6;
    const progress = (currentStep / totalSteps) * 100;

    // Navigation
    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => (prev + 1) as Step);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as Step);
        }
    };

    // Validation du step actuel
    const canProceed = () => {
        const values = watch();

        switch (currentStep) {
            case 1:
                return values.firstName && values.firstName.length >= 2 &&
                    values.lastName && values.lastName.length >= 2 &&
                    values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
            case 2:
                return values.companyName && values.companyName.length >= 2;
            case 3:
                return values.serviceType !== undefined;
            case 4:
                return values.helpType !== undefined;
            case 5:
                return values.budgetMin !== undefined && values.budgetMax !== undefined;
            case 6:
                return values.discoverySource !== undefined;
            default:
                return true;
        }
    };

    const onSubmit = async (data: ContactFormData) => {
        console.log("🚀 Soumission du formulaire", data);

        // Anti-bot check
        const elapsed = Date.now() - startedAt;
        if (elapsed < 5000) {
            toast.error("Merci de prendre le temps de remplir le formulaire");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erreur lors de l\'envoi');
            }

            const score = calculateLeadScore(data);
            const category = categorizeLead(score);

            console.log("📊 Lead score:", score, category);

            toast.success("Message envoyé avec succès ! Je vous réponds sous 24-48h.");
            form.reset();

        } catch (error) {
            console.error('❌ Erreur:', error);
            toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'envoi');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
            <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

            {/* Progress bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
                <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Form */}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative z-10 w-full max-w-2xl"
            >
                <Honeypot register={register} />

                {/* Step counter */}
                <div className="mb-8 text-center">
                    <p className="text-white/60 text-sm font-medium">
                        Étape {currentStep} sur {totalSteps}
                    </p>
                </div>

                {/* Step content */}
                <div ref={stepRef} className="min-h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                    {/* Step 1: Informations personnelles */}
                    {currentStep === 1 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Bonjour ! 👋
                                </h2>
                                <p className="text-xl text-white/60">
                                    Commençons par faire connaissance
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-3">
                                            Prénom *
                                        </label>
                                        <Input
                                            {...register("firstName")}
                                            placeholder="John"
                                            className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500"
                                            autoFocus
                                        />
                                        {form.formState.errors.firstName && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {form.formState.errors.firstName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-3">
                                            Nom *
                                        </label>
                                        <Input
                                            {...register("lastName")}
                                            placeholder="Doe"
                                            className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500"
                                        />
                                        {form.formState.errors.lastName && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {form.formState.errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                        Email *
                                    </label>
                                    <Input
                                        {...register("email")}
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500"
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {form.formState.errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                        Téléphone (optionnel)
                                    </label>
                                    <PhoneInput
                                        value={watch("phone")}
                                        onChange={(value) => setValue("phone", value)}
                                        placeholder="+33 6 12 34 56 78"
                                        error={form.formState.errors.phone?.message}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Entreprise */}
                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Votre entreprise 🏢
                                </h2>
                                <p className="text-xl text-white/60">
                                    Parlez-moi de votre marque
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                        Nom de la marque *
                                    </label>
                                    <Input
                                        {...register("companyName")}
                                        placeholder="Acme Inc."
                                        className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500"
                                        autoFocus
                                    />
                                    {form.formState.errors.companyName && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {form.formState.errors.companyName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                        Site web (optionnel)
                                    </label>
                                    <Input
                                        {...register("companyWebsite")}
                                        type="url"
                                        placeholder="https://acme.com"
                                        className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500"
                                    />
                                    {form.formState.errors.companyWebsite && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {form.formState.errors.companyWebsite.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Type de service */}
                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Votre projet 💼
                                </h2>
                                <p className="text-xl text-white/60">
                                    Quel type de service recherchez-vous ?
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {SERVICE_TYPES.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setValue("serviceType", type)}
                                            className={`p-6 rounded-2xl border transition-all text-left ${watch("serviceType") === type
                                                ? "bg-orange-500/20 border-orange-500 text-white"
                                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className="text-xl font-semibold">
                                                {type === "web" && "🌐 Site Web"}
                                                {type === "saas" && "⚡ SaaS"}
                                                {type === "ecommerce" && "🛍️ E-commerce"}
                                                {type === "mobile" && "📱 Application Mobile"}
                                                {type === "autre" && "✨ Autre"}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* CMS e-commerce si sélectionné */}
                                {serviceType === "ecommerce" && (
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-3">
                                            CMS utilisé *
                                        </label>
                                        <select
                                            {...register("ecommerceCms")}
                                            className="w-full h-14 bg-white/5 border border-white/10 rounded-xl text-white text-lg px-4 focus:border-orange-500"
                                        >
                                            <option value="">- Sélectionnez -</option>
                                            {ECOMMERCE_CMS.map((cms) => (
                                                <option key={cms} value={cms} className="bg-gray-900">
                                                    {cms.charAt(0).toUpperCase() + cms.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {form.formState.errors.ecommerceCms && (
                                            <p className="text-red-400 text-sm mt-2">
                                                {form.formState.errors.ecommerceCms.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Comment aider */}
                    {currentStep === 4 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Comment vous aider ? ✨
                                </h2>
                                <p className="text-xl text-white/60">
                                    Quel est votre besoin principal ?
                                </p>
                            </div>

                            <div className="space-y-4">
                                {HELP_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setValue("helpType", type)}
                                        className={`w-full p-6 rounded-2xl border transition-all text-left ${watch("helpType") === type
                                            ? "bg-orange-500/20 border-orange-500 text-white"
                                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="text-xl font-semibold">
                                            {type === "refonte" && "🔄 Refonte de site existant"}
                                            {type === "creation" && "✨ Création complète"}
                                            {type === "ui-ux" && "🎨 UI/UX Design uniquement"}
                                            {type === "dev-integration" && "⚙️ Développement & Intégration"}
                                            {type === "autre" && "💡 Autre besoin"}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Budget */}
                    {currentStep === 5 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Budget 💰
                                </h2>
                                <p className="text-xl text-white/60">
                                    Quel est votre budget pour ce projet ?
                                </p>
                            </div>

                            <div className="space-y-6">
                                <BudgetSlider
                                    minValue={(watch("budgetMin") ?? 5000) as number}
                                    maxValue={(watch("budgetMax") ?? 15000) as number}
                                    onMinChange={(val) => setValue("budgetMin", val as number)}
                                    onMaxChange={(val) => setValue("budgetMax", val as number)}
                                />
                                {form.formState.errors.budgetMax && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {form.formState.errors.budgetMax.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 6: Découverte + Message */}
                    {currentStep === 6 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Dernière étape ! 🎯
                                </h2>
                                <p className="text-xl text-white/60">
                                    Comment m'avez-vous connu ?
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-3">
                                    {DISCOVERY_SOURCES.map((source) => (
                                        <button
                                            key={source}
                                            type="button"
                                            onClick={() => setValue("discoverySource", source)}
                                            className={`p-4 rounded-xl border transition-all ${watch("discoverySource") === source
                                                ? "bg-orange-500/20 border-orange-500 text-white"
                                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                                }`}
                                        >
                                            {source === "google" && "🔍 Google"}
                                            {source === "social" && "📱 Réseaux sociaux"}
                                            {source === "recommendation" && "👥 Recommandation"}
                                            {source === "event" && "🎪 Événement"}
                                            {source === "autre" && "✨ Autre"}
                                        </button>
                                    ))}
                                </div>

                                {discoverySource === "autre" && (
                                    <div>
                                        <Input
                                            {...register("discoverySourceOther")}
                                            placeholder="Précisez..."
                                            className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500"
                                        />
                                        {form.formState.errors.discoverySourceOther && (
                                            <p className="text-red-400 text-sm mt-2">
                                                {form.formState.errors.discoverySourceOther.message}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                        Message (optionnel)
                                    </label>
                                    <Textarea
                                        {...register("message")}
                                        placeholder="Parlez-moi de votre projet, vos objectifs, vos contraintes..."
                                        rows={4}
                                        className="w-full bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500 resize-none"
                                    />
                                    {form.formState.errors.message && (
                                        <p className="text-red-400 text-sm mt-2">
                                            {form.formState.errors.message.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                    <Button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        variant="ghost"
                        className="text-white/60 hover:text-white disabled:opacity-30"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Retour
                    </Button>

                    {currentStep < totalSteps ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl disabled:opacity-50"
                        >
                            Continuer
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isSubmitting || !canProceed()}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Envoi...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Check className="w-5 h-5" />
                                    Envoyer
                                </span>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};