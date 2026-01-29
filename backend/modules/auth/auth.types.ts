import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    passwordResetExpires: z.date().optional(),
    passwordResetToken: z.string().optional(),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type createUser = z.infer<typeof createUserSchema>;
export type updateUser = z.infer<typeof updateUserSchema>;
export type signIn = z.infer<typeof signInSchema>;