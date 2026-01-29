import { z } from "zod";

export const createEventTemplateFormSchema = z.object({
    name: z.string().min(1),
    attendant: z.string().min(1),
    userId: z.number(),
    categories: z.array(z.object({
        name: z.string().min(1),
        count: z.number(),
    })).optional(),
});

export type createEventTemplateForm = z.infer<typeof createEventTemplateFormSchema>;