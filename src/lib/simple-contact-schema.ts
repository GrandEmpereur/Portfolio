import { z } from 'zod';

export const simpleContactSchema = z.object({
    name: z.string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(100, "Le nom ne peut pas dépasser 100 caractères"),
    email: z.string()
        .email("Adresse email invalide")
        .min(5, "L'email doit contenir au moins 5 caractères")
        .max(255, "L'email ne peut pas dépasser 255 caractères"),
    message: z.string()
        .min(10, "Le message doit contenir au moins 10 caractères")
        .max(2000, "Le message ne peut pas dépasser 2000 caractères"),
    honeypot: z.string().optional(),
});

export type SimpleContactData = z.infer<typeof simpleContactSchema>;

