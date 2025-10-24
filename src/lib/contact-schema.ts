import { z } from "zod";

// ===== ENUMS & CONSTANTS =====

export const SERVICE_TYPES = ["web", "saas", "ecommerce", "mobile", "autre"] as const;
export const ECOMMERCE_CMS = ["shopify", "woocommerce", "prestashop", "magento", "autre"] as const;
export const HELP_TYPES = ["refonte", "creation", "ui-ux", "dev-integration", "autre"] as const;
export const DISCOVERY_SOURCES = ["google", "social", "recommendation", "event", "autre"] as const;

// ===== HELPER SCHEMAS =====

// Téléphone optionnel avec validation simple
const phoneSchema = z
    .string()
    .optional()
    .refine((phone) => {
        if (!phone || phone === "") return true;
        return /^\+[1-9]\d{9,14}$/.test(phone);
    }, {
        message: "Format de téléphone invalide (ex: +33612345678)"
    });

// URL optionnelle
const urlSchema = z
    .string()
    .optional()
    .refine((url) => {
        if (!url || url === "") return true;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }, {
        message: "URL invalide (ex: https://votresite.com)"
    });

// ===== FORM SCHEMA COMPLET =====

export const contactFormSchema = z.object({
    // Infos personnelles
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    phone: phoneSchema,

    // Société
    companyName: z.string().min(2, "Le nom de la marque est requis"),
    companyWebsite: urlSchema,

    // Type de service
    serviceType: z.enum(SERVICE_TYPES),
    ecommerceCms: z.enum(ECOMMERCE_CMS).optional(),

    // Besoin
    helpType: z.enum(HELP_TYPES),

    // Budget
    budgetMin: z.number().min(0, "Le budget doit être positif"),
    budgetMax: z.number().min(0, "Le budget doit être positif"),

    // Comment nous avez-vous connu
    discoverySource: z.enum(DISCOVERY_SOURCES),
    discoverySourceOther: z.string().optional(),

    // Message optionnel
    message: z.string().max(2000, "Le message ne peut pas dépasser 2000 caractères").optional(),

    // Anti-spam
    honeypot: z.string().max(0, "Spam detected").optional(),
}).refine((data) => data.budgetMax >= data.budgetMin, {
    message: "Le budget maximum doit être supérieur au minimum",
    path: ["budgetMax"],
}).refine((data) => {
    // Si e-commerce, le CMS est requis
    if (data.serviceType === "ecommerce") {
        return !!data.ecommerceCms;
    }
    return true;
}, {
    message: "Le CMS est requis pour un projet e-commerce",
    path: ["ecommerceCms"],
}).refine((data) => {
    // Si "autre" pour discovery, le champ texte est requis
    if (data.discoverySource === "autre") {
        return !!data.discoverySourceOther && data.discoverySourceOther.length > 0;
    }
    return true;
}, {
    message: "Précisez comment vous nous avez connu",
    path: ["discoverySourceOther"],
});

// ===== TYPES =====

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ===== LEAD SCORING =====

export function calculateLeadScore(data: ContactFormData): number {
    let score = 0;

    // Contact complet
    if (data.phone) score += 10;
    if (data.companyWebsite) score += 10;

    // Budget
    if (data.budgetMin >= 5000) score += 20;
    if (data.budgetMin >= 15000) score += 20;

    // Type de service (certains types sont plus qualifiés)
    if (["saas", "ecommerce"].includes(data.serviceType)) score += 15;

    // Type d'aide (création complète = plus qualifié)
    if (["creation", "refonte"].includes(data.helpType)) score += 15;

    // Source de découverte (recommandation = meilleur lead)
    if (data.discoverySource === "recommendation") score += 10;

    return Math.min(score, 100);
}

export function categorizeLead(score: number): "hot" | "warm" | "cold" {
    if (score >= 70) return "hot";
    if (score >= 40) return "warm";
    return "cold";
}

