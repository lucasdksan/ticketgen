import { EventRepository } from "./event.repository";
import { createEventTemplate } from "./event.types";

export const EventService = { 
    async create(data: createEventTemplate){
        return await EventRepository.create(data);
    },

    async generateLinks(userId: number){
        const events = await EventRepository.findAll(userId);

        return events.map(event => {
            return {
                ...event,
                link: `/event/${userId}-${event.id}`
            }
        });
    },

    async findById(userId: number, eventId: number){
        return await EventRepository.findById(userId, eventId);
    }
};