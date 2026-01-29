import { z } from "zod";
import { env } from "@/libs/env";

export const signUpSchema = z
    .object({
        name: z.string().min(2, "Nome muito curto"),
        email: z.string().email("Email inválido"),
        accessCode: z.string().min(6, "Código de acesso muito curto"),
        password: z.string().min(8, "Mínimo de 8 caracteres"),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não conferem",
        path: ["confirmPassword"],
    }).refine((data) => data.accessCode === env.ACCESS_TOKEN as string, {
        message: "Código de acesso inválido",
        path: ["accessCode"],
    });

export type signUpSchemaType = z.infer<typeof signUpSchema>;