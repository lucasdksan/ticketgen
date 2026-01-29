import { prisma } from "@/backend/shared/database/prisma";

export const UsersRepository = {
    async findById(id: number){
        return await prisma.users.findUnique({
            where: { id }
        });
    }
};