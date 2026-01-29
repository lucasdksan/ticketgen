"use server";

import { EventService } from "@/backend/modules/event/event.service";
import { UsersService } from "@/backend/modules/users/users.service";

export async function getEventAction(userId: number, eventId: number){
    try {
        const userExists = await UsersService.exists(userId);

        if (!userExists) {
            return {
                success: false,
                event: null,
                message: "Usuário não encontrado",
                errors: null,
            };
        }

        const event = await EventService.findById(userId, eventId);

        if (!event) {
            return {
                success: false,
                event: null,
                message: "Evento não encontrado",
                errors: null,
            };
        }
        
        return {
            success: true,
            event,
            message: "Evento encontrado com sucesso",
            errors: null,
        }
    } catch (error) {
        console.error(error);
        return {
            event: null,
            success: false,
            message: "Erro ao buscar evento",
            errors: null,
        };
    }
}