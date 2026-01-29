"use server";

import { AppError } from "@/backend/shared/errors/app-error";
import { AuthService } from "@/backend/modules/auth/auth.service";
import tokenIntoCookies from "@/libs/token";
import { env } from "@/libs/env";
import { signInSchema } from "@/schemas/signin";
import { SignInState } from "@/types";

export async function signInAction(prevState: SignInState, formData: FormData): Promise<SignInState> {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const parsed = signInSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            success: false,
            user: null,
            errors: parsed.error.flatten().fieldErrors,
            message: "Dados inválidos",
        };
    }

    try {
        const { token, name, email: userEmail } = await AuthService.signIn(parsed.data);
        await tokenIntoCookies.set(token, env.NODE_ENV === "production");

        return { success: true, user: { name, email: userEmail }, errors: null, message: "Login realizado com sucesso" };
    } catch (error) {
        return {
            success: false,
            user: null,
            errors: error instanceof AppError ? (error.details as Record<string, string[] | undefined>) : null,
            message: error instanceof AppError ? error.message : "Erro ao fazer login",
        };
    }
}