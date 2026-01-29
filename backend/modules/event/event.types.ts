import z from "zod";

export const createEventTemplateSchema = z.object({
    name: z.string().min(1),
    attendant: z.string().min(1),
    userId: z.number(),
    categories: z.array(z.object({
        name: z.string().min(1),
        count: z.number(),
    })).optional(),
});

export type createEventTemplate = z.infer<typeof createEventTemplateSchema>;