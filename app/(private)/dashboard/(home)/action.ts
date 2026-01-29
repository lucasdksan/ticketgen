"use server";

import { getCurrentUser } from "@/libs/auth";
import { revalidatePath } from "next/cache";
import { createEventTemplateFormSchema } from "@/schemas/event";
import { CreateEventState, EventTemplate } from "@/types";
import { EventService } from "@/backend/modules/event/event.service";
import { UsersService } from "@/backend/modules/users/users.service";

export async function createEventTemplateAction(
    prevState: CreateEventState,
    formData: FormData
): Promise<CreateEventState> {
    const user = await getCurrentUser();

    if (!user) {
        return {
            success: false,
            message: "Usuário não autenticado",
            errors: null,
        };
    }

    const name = formData.get("name") as string;
    const attendant = formData.get("attendant") as string;
    const categoriesJson = formData.get("categories") as string;
    
    let categories = [];
    try {
        categories = JSON.parse(categoriesJson || "[]");
    } catch {
        return {
            success: false,
            message: "Categorias inválidas",
            errors: null,
        };
    }

    const validatedFields = createEventTemplateFormSchema.safeParse({
        name,
        attendant,
        userId: Number(user.sub),
        categories,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Erro de validação",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const userExists = await UsersService.exists(Number(user.sub));

        if (!userExists) {
            return {
                success: false,
                message: "Usuário não encontrado no sistema. Faça login novamente.",
                errors: null,
            };
        }

        await EventService.create(validatedFields.data);

        revalidatePath("/dashboard");

        return {
            success: true,
            message: "Evento criado com sucesso!",
            errors: null,
        };
    } catch (error) {
        console.error("Failed to create event template:", error);
        return {
            success: false,
            message: "Erro ao criar o evento. Tente novamente.",
            errors: null,
        };
    }
}

export async function generateLinksAction(userId: number): Promise<{ success: boolean, events: EventTemplate[], message: string }> {
    try {
        const events = await EventService.generateLinks(userId);
    
        return {
            success: true,
            message: "Links gerados com sucesso",
            events,
        };
    } catch (error) {
        return {
            success: false,
            message: "Erro ao gerar links",
            events: [],
        };
    }
}