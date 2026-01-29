"use server";

import { AuthService } from "@/backend/modules/auth/auth.service";
import { AppError } from "@/backend/shared/errors/app-error";
import tokenIntoCookies from "@/libs/token";
import { signUpSchema } from "@/schemas/signup";
import { SignUpState } from "@/types";
import { env } from "@/libs/env";

export async function signUpAction(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        accessCode: formData.get("accessCode"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };
    const parsed = signUpSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            success: false,
            user: null,
            errors: parsed.error.flatten().fieldErrors,
            message: "Dados inválidos",
        };
    }
    
    try {
        const { token, name, email: userEmail } = await AuthService.create({
            name: parsed.data.name,
            email: parsed.data.email,
            password: parsed.data.password,
        });
        await tokenIntoCookies.set(token, env.NODE_ENV === "production");

        return { success: true, user: { name, email: userEmail }, errors: null, message: "Cadastro realizado com sucesso" };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            user: null,
            errors: error instanceof AppError ? (error.details as Record<string, string[] | undefined>) : null,
            message: error instanceof AppError ? error.message : "Erro ao fazer cadastro",
        };
    }
}