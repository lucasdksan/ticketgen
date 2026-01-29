import { prisma } from "@/backend/shared/database/prisma";
import { createEventTemplate } from "./event.types";
import { EventTemplate, Category } from "@prisma/client";

export const EventRepository = {
    async create(data: createEventTemplate): Promise<EventTemplate>{
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

    async findAll(userId: number): Promise<(EventTemplate & { categories: Category[] })[]>{
        return await prisma.eventTemplate.findMany({
            where: {
                userId
            },
            include: {
                categories: true
            }	
        });
    },

    async findById(userId: number, eventId: number): Promise<(EventTemplate & { categories: Category[] }) | null>{
        return await prisma.eventTemplate.findUnique({
            where: { userId, id: eventId },
            include: {
                categories: true
            }
        });
    }
};