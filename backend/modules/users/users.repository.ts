import { prisma } from "@/backend/shared/database/prisma";
import { Users } from "@prisma/client";

export const UsersRepository = {
    async findById(id: number): Promise<Users | null>{
        return await prisma.users.findUnique({
            where: { id }
        });
    }
};