"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import { useScopedI18n } from "@/locales/client";
import {
    contactFormSchema,
    type ContactFormData,
    SERVICE_TYPES,
    ECOMMERCE_CMS,
    DISCOVERY_SOURCES,
    getHelpTypesForService,
} from "@/lib/contact-schema";
import { PhoneInput } from "@/components/form/PhoneInput";
import { BudgetSlider } from "@/components/form/BudgetSlider";
import { Honeypot } from "@/components/form/Honeypot";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const TOTAL_STEPS = 6;

// Brouillon conservé pour la session : un refresh ne fait pas perdre la saisie
const STORAGE_KEY = "contact-wizard-draft-v1";

const inputClassName =
    "w-full border-0 border-b border-white/20 bg-transparent py-3 text-sm text-white transition-colors placeholder:text-white/20 focus:border-white/60 focus:outline-none";

const labelClassName =
    "mb-2 block text-xs uppercase tracking-wider text-white/40";

const FieldError = ({ message }: { message?: string }) =>
    message ? (
        <p role="alert" className="mt-1 text-xs text-red-400">
            {message}
        </p>
    ) : null;

export const SimpleContactForm = () => {
    const t = useScopedI18n("contactWizard");
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const startedAt = useRef(0);
    const directionRef = useRef(1);
    const sectionRef = useRef<HTMLDivElement>(null);
    const stepRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

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

    const { watch, setValue, register, formState } = form;
    const serviceType = watch("serviceType");
    const discoverySource = watch("discoverySource");
    const helpTypes = getHelpTypesForService(serviceType);

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const saved = JSON.parse(raw) as {
                step?: number;
                values?: Partial<ContactFormData>;
            };
            if (saved.values) {
                form.reset({ ...form.getValues(), ...saved.values, honeypot: "" });
            }
            if (saved.step && saved.step >= 1 && saved.step <= TOTAL_STEPS) {
                setCurrentStep(saved.step as Step);
            }
        } catch {
            sessionStorage.removeItem(STORAGE_KEY);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSent) {
            sessionStorage.removeItem(STORAGE_KEY);
            return;
        }
        const persist = (values: Partial<ContactFormData>) => {
            const { honeypot: _honeypot, ...rest } = values;
            try {
                sessionStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ step: currentStep, values: rest }),
                );
            } catch {
                // stockage plein ou indisponible : le brouillon est best-effort
            }
        };
        persist(watch());
        const subscription = watch((values) => persist(values as Partial<ContactFormData>));
        return () => subscription.unsubscribe();
    }, [watch, currentStep, isSent]);

    const selectService = (type: (typeof SERVICE_TYPES)[number]) => {
        if (type !== serviceType) {
            // Les besoins proposés dépendent du service : on repart de zéro
            setValue(
                "helpType",
                undefined as unknown as ContactFormData["helpType"],
            );
        }
        setValue("serviceType", type);
    };

    const stepTitles: Record<Step, string> = {
        1: t("step1.title"),
        2: t("step2.title"),
        3: t("step3.title"),
        4: t("step4.title"),
        5: t("step5.title"),
        6: t("step6.title"),
    };

    const stepSubtitles: Record<Step, string> = {
        1: t("step1.subtitle"),
        2: t("step2.subtitle"),
        3: t("step3.subtitle"),
        4: t("step4.subtitle"),
        5: t("step5.subtitle"),
        6: t("step6.subtitle"),
    };

    useGSAP(
        () => {
            if (startedAt.current === 0) startedAt.current = Date.now();

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReducedMotion || !stepRef.current) return;

            gsap.from(stepRef.current, {
                x: directionRef.current * 48,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                clearProps: "transform,opacity",
            });
        },
        { scope: sectionRef, dependencies: [currentStep, isSent] },
    );

    const goToStep = (step: Step, direction: 1 | -1) => {
        directionRef.current = direction;
        setCurrentStep(step);
        requestAnimationFrame(() => titleRef.current?.focus());
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) goToStep((currentStep + 1) as Step, 1);
    };

    const prevStep = () => {
        if (currentStep > 1) goToStep((currentStep - 1) as Step, -1);
    };

    const canProceed = () => {
        const values = watch();
        switch (currentStep) {
            case 1:
                return Boolean(
                    values.firstName &&
                        values.firstName.length >= 2 &&
                        values.lastName &&
                        values.lastName.length >= 2 &&
                        values.email &&
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
                );
            case 2:
                return Boolean(values.companyName && values.companyName.length >= 2);
            case 3:
                return (
                    values.serviceType !== undefined &&
                    (values.serviceType !== "ecommerce" || Boolean(values.ecommerceCms))
                );
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
        const elapsed = Date.now() - startedAt.current;
        if (elapsed < 5000) {
            toast.error(t("toast.tooFast"));
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || t("toast.error"));
            }

            directionRef.current = 1;
            setIsSent(true);
        } catch {
            toast.error(t("toast.error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Enter avance d'étape au lieu de soumettre prématurément
    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (
            event.key === "Enter" &&
            currentStep < TOTAL_STEPS &&
            !(event.target instanceof HTMLTextAreaElement)
        ) {
            event.preventDefault();
            if (canProceed()) nextStep();
        }
    };

    if (isSent) {
        return (
            <div
                ref={sectionRef}
                className="flex min-h-screen items-center bg-black px-6 pt-24 pb-24 sm:px-8 md:px-12 lg:px-20"
            >
                <div ref={stepRef} className="mx-auto w-full max-w-7xl">
                    <p className="font-mono text-xs tracking-widest text-white/30">
                        {t("stepOf", { current: TOTAL_STEPS, total: TOTAL_STEPS })}
                    </p>
                    <h2 className="mt-6 max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
                        {t("success.title")}
                    </h2>
                    <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/60 md:text-lg">
                        {t("success.body")}
                    </p>
                    <Link
                        href="/"
                        className="group mt-12 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
                    >
                        {t("success.cta")}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={sectionRef}
            className="min-h-screen bg-black px-6 pt-32 pb-24 sm:px-8 md:px-12 md:pt-36 lg:px-20"
        >
            <div className="mx-auto w-full max-w-7xl">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    onKeyDown={handleKeyDown}
                    noValidate
                    className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
                >
                    <Honeypot register={register} />

                    {/* Rail des étapes */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                            <p className="text-xs font-light uppercase tracking-[0.3em] text-white/40">
                                {t("stepOf", { current: currentStep, total: TOTAL_STEPS })}
                            </p>
                            <ol className="mt-8 hidden lg:block">
                                {([1, 2, 3, 4, 5, 6] as Step[]).map((step) => {
                                    const isCurrent = step === currentStep;
                                    const isDone = step < currentStep;
                                    return (
                                        <li
                                            key={step}
                                            aria-current={isCurrent ? "step" : undefined}
                                            className={`flex items-baseline gap-4 border-t border-white/10 py-4 transition-colors duration-300 last:border-b ${
                                                isCurrent ? "border-white/25" : ""
                                            }`}
                                        >
                                            <span
                                                className={`font-mono text-xs ${
                                                    isCurrent ? "text-white" : "text-white/30"
                                                }`}
                                            >
                                                {String(step).padStart(2, "0")}
                                            </span>
                                            <span
                                                className={`flex-1 text-sm transition-colors duration-300 ${
                                                    isCurrent
                                                        ? "font-medium text-white"
                                                        : isDone
                                                          ? "text-white/50"
                                                          : "text-white/25"
                                                }`}
                                            >
                                                {stepTitles[step]}
                                            </span>
                                            {isDone && (
                                                <Check aria-hidden className="h-3.5 w-3.5 text-white/40" />
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>

                    {/* Contenu de l'étape */}
                    <div className="lg:col-span-8">
                        <div ref={stepRef} className="min-h-[420px]">
                            <h2
                                ref={titleRef}
                                tabIndex={-1}
                                className="text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white outline-none"
                            >
                                {stepTitles[currentStep]}
                            </h2>
                            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/50 md:text-base">
                                {stepSubtitles[currentStep]}
                            </p>

                            <div className="mt-10 md:mt-12">
                                {/* Étape 1 : identité */}
                                {currentStep === 1 && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="firstName" className={labelClassName}>
                                                    {t("step1.firstName")}
                                                </label>
                                                <input
                                                    id="firstName"
                                                    autoComplete="given-name"
                                                    {...register("firstName")}
                                                    aria-invalid={Boolean(formState.errors.firstName)}
                                                    placeholder={t("step1.firstNamePlaceholder")}
                                                    className={inputClassName}
                                                    autoFocus
                                                />
                                                <FieldError message={formState.errors.firstName?.message} />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className={labelClassName}>
                                                    {t("step1.lastName")}
                                                </label>
                                                <input
                                                    id="lastName"
                                                    autoComplete="family-name"
                                                    {...register("lastName")}
                                                    aria-invalid={Boolean(formState.errors.lastName)}
                                                    placeholder={t("step1.lastNamePlaceholder")}
                                                    className={inputClassName}
                                                />
                                                <FieldError message={formState.errors.lastName?.message} />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className={labelClassName}>
                                                {t("step1.email")}
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                {...register("email")}
                                                aria-invalid={Boolean(formState.errors.email)}
                                                placeholder={t("step1.emailPlaceholder")}
                                                className={inputClassName}
                                            />
                                            <FieldError message={formState.errors.email?.message} />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className={labelClassName}>
                                                {t("step1.phone")}{" "}
                                                <span className="normal-case text-white/25">
                                                    ({t("optional")})
                                                </span>
                                            </label>
                                            <PhoneInput
                                                id="phone"
                                                value={watch("phone")}
                                                onChange={(value) => setValue("phone", value)}
                                                placeholder={t("step1.phonePlaceholder")}
                                                error={formState.errors.phone?.message}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Étape 2 : entreprise */}
                                {currentStep === 2 && (
                                    <div className="space-y-8">
                                        <div>
                                            <label htmlFor="companyName" className={labelClassName}>
                                                {t("step2.companyName")}
                                            </label>
                                            <input
                                                id="companyName"
                                                autoComplete="organization"
                                                {...register("companyName")}
                                                aria-invalid={Boolean(formState.errors.companyName)}
                                                placeholder={t("step2.companyNamePlaceholder")}
                                                className={inputClassName}
                                                autoFocus
                                            />
                                            <FieldError message={formState.errors.companyName?.message} />
                                        </div>
                                        <div>
                                            <label htmlFor="companyWebsite" className={labelClassName}>
                                                {t("step2.companyWebsite")}{" "}
                                                <span className="normal-case text-white/25">
                                                    ({t("optional")})
                                                </span>
                                            </label>
                                            <input
                                                id="companyWebsite"
                                                type="url"
                                                autoComplete="url"
                                                {...register("companyWebsite")}
                                                aria-invalid={Boolean(formState.errors.companyWebsite)}
                                                placeholder={t("step2.companyWebsitePlaceholder")}
                                                className={inputClassName}
                                            />
                                            <FieldError message={formState.errors.companyWebsite?.message} />
                                        </div>
                                    </div>
                                )}

                                {/* Étape 3 : type de service */}
                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div role="radiogroup" aria-label={t("step3.subtitle")}>
                                            {SERVICE_TYPES.map((type) => {
                                                const isSelected = serviceType === type;
                                                return (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        role="radio"
                                                        aria-checked={isSelected}
                                                        onClick={() => selectService(type)}
                                                        className={`group flex w-full items-baseline gap-5 border-t border-white/10 py-5 text-left transition-colors duration-300 last:border-b hover:border-white/25 ${
                                                            isSelected ? "border-white/30" : ""
                                                        }`}
                                                    >
                                                        <span
                                                            className={`text-base font-semibold uppercase tracking-tight transition-colors duration-300 md:text-lg ${
                                                                isSelected
                                                                    ? "text-white"
                                                                    : "text-white/50 group-hover:text-white/80"
                                                            }`}
                                                        >
                                                            {t(`step3.${type}`)}
                                                        </span>
                                                        <span className="hidden flex-1 text-sm font-light text-white/40 sm:block">
                                                            {t(`step3.${type}Desc`)}
                                                        </span>
                                                        <Check
                                                            aria-hidden
                                                            className={`h-4 w-4 shrink-0 self-center transition-opacity duration-300 ${
                                                                isSelected ? "text-white opacity-100" : "opacity-0"
                                                            }`}
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {serviceType === "ecommerce" && (
                                            <div className="max-w-xs">
                                                <label htmlFor="ecommerceCms" className={labelClassName}>
                                                    {t("step3.cmsLabel")}
                                                </label>
                                                <select
                                                    id="ecommerceCms"
                                                    {...register("ecommerceCms")}
                                                    aria-invalid={Boolean(formState.errors.ecommerceCms)}
                                                    className={`${inputClassName} appearance-none [&>option]:bg-black`}
                                                >
                                                    <option value="">{t("step3.cmsPlaceholder")}</option>
                                                    {ECOMMERCE_CMS.map((cms) => (
                                                        <option key={cms} value={cms}>
                                                            {cms.charAt(0).toUpperCase() + cms.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                                <FieldError message={formState.errors.ecommerceCms?.message} />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Étape 4 : besoin */}
                                {currentStep === 4 && (
                                    <div role="radiogroup" aria-label={t("step4.subtitle")}>
                                        {helpTypes.map((type) => {
                                            const isSelected = watch("helpType") === type;
                                            return (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={isSelected}
                                                    onClick={() => setValue("helpType", type)}
                                                    className={`group flex w-full items-baseline gap-5 border-t border-white/10 py-5 text-left transition-colors duration-300 last:border-b hover:border-white/25 ${
                                                        isSelected ? "border-white/30" : ""
                                                    }`}
                                                >
                                                    <span
                                                        className={`text-base font-semibold uppercase tracking-tight transition-colors duration-300 md:text-lg ${
                                                            isSelected
                                                                ? "text-white"
                                                                : "text-white/50 group-hover:text-white/80"
                                                        }`}
                                                    >
                                                        {t(`step4.${type}`)}
                                                    </span>
                                                    <span className="hidden flex-1 text-sm font-light text-white/40 sm:block">
                                                        {t(`step4.${type}Desc`)}
                                                    </span>
                                                    <Check
                                                        aria-hidden
                                                        className={`h-4 w-4 shrink-0 self-center transition-opacity duration-300 ${
                                                            isSelected ? "text-white opacity-100" : "opacity-0"
                                                        }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Étape 5 : budget */}
                                {currentStep === 5 && (
                                    <div>
                                        <BudgetSlider
                                            minValue={(watch("budgetMin") ?? 5000) as number}
                                            maxValue={(watch("budgetMax") ?? 15000) as number}
                                            onMinChange={(val) => setValue("budgetMin", val as number)}
                                            onMaxChange={(val) => setValue("budgetMax", val as number)}
                                            labels={{
                                                estimated: t("step5.estimated"),
                                                min: t("step5.min"),
                                                max: t("step5.max"),
                                                presets: t("step5.presets"),
                                            }}
                                        />
                                        <FieldError message={formState.errors.budgetMax?.message} />
                                    </div>
                                )}

                                {/* Étape 6 : découverte + message */}
                                {currentStep === 6 && (
                                    <div className="space-y-10">
                                        <div
                                            role="radiogroup"
                                            aria-label={t("step6.subtitle")}
                                            className="flex flex-wrap gap-2"
                                        >
                                            {DISCOVERY_SOURCES.map((source) => {
                                                const isSelected = discoverySource === source;
                                                return (
                                                    <button
                                                        key={source}
                                                        type="button"
                                                        role="radio"
                                                        aria-checked={isSelected}
                                                        onClick={() => setValue("discoverySource", source)}
                                                        className={`rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
                                                            isSelected
                                                                ? "border-white bg-white font-medium text-black"
                                                                : "border-white/10 font-light text-white/50 hover:border-white/30 hover:text-white"
                                                        }`}
                                                    >
                                                        {t(`step6.${source}`)}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {discoverySource === "autre" && (
                                            <div>
                                                <input
                                                    aria-label={t("step6.otherPlaceholder")}
                                                    {...register("discoverySourceOther")}
                                                    placeholder={t("step6.otherPlaceholder")}
                                                    className={inputClassName}
                                                />
                                                <FieldError
                                                    message={formState.errors.discoverySourceOther?.message}
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <label htmlFor="message" className={labelClassName}>
                                                {t("step6.message")}{" "}
                                                <span className="normal-case text-white/25">
                                                    ({t("optional")})
                                                </span>
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={4}
                                                {...register("message")}
                                                aria-invalid={Boolean(formState.errors.message)}
                                                placeholder={t("step6.messagePlaceholder")}
                                                className={`${inputClassName} min-h-[120px] resize-none`}
                                            />
                                            <FieldError message={formState.errors.message?.message} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="mt-12 flex items-center justify-between gap-4 md:mt-16">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-light text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-0"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                {t("back")}
                            </button>

                            {currentStep < TOTAL_STEPS ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {t("next")}
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !canProceed()}
                                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            {t("submitting")}
                                        </>
                                    ) : (
                                        <>
                                            {t("submit")}
                                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
