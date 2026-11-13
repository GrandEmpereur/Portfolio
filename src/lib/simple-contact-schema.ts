import { z } from 'zod';

// Messages stay neutral: the screen shows its own translated copy.
export const simpleContactSchema = z.object({
    name: z.string().trim().min(2, 'invalid').max(100, 'invalid'),
    email: z.string().trim().max(255, 'invalid').pipe(z.email('invalid')),
    message: z.string().trim().min(20, 'invalid').max(2000, 'invalid'),
    locale: z.enum(['fr', 'en', 'pl']).default('fr'),
    // Honeypot: must stay empty.
    website: z.string().trim().max(0, 'invalid').optional(),
});

export type SimpleContactData = z.infer<typeof simpleContactSchema>;
