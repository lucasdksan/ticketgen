import { prisma } from "@/backend/shared/database/prisma";
import { createEventTemplate } from "./event.types";

export const EventRepository = {
    async create(data: createEventTemplate){
        const { categories, ...rest } = data;
        return await prisma.eventTemplate.create({
            data: {
                ...rest,
                categories: categories ? {
                    create: categories
                } : undefined
            }
        });
    },

    async findAll(userId: number){
        return await prisma.eventTemplate.findMany({
            where: {
                userId
            },
            include: {
                categories: true
            }	
        });
    },

    async findById(userId: number, eventId: number){
        return await prisma.eventTemplate.findUnique({
            where: { userId, id: eventId },
            include: {
                categories: true
            }
        });
    }
};