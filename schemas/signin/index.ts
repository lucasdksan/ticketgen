import { z } from "zod";

export const signInSchema = z
    .object({
        email: z.email("Email inválido"),
        password: z.string().min(8, "Mínimo de 8 caracteres"),
    });

export type signInSchemaType = z.infer<typeof signInSchema>;