import { prisma } from "@/backend/shared/database/prisma";
import { createUser, updateUser } from "./auth.types";
import { Users } from "@prisma/client";

export const AuthRepository = {
    async create(data: createUser): Promise<Users>{
        const user = await prisma.users.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
            }
        });

        return user;
    },

    async findByEmail(email: string): Promise<Users | null>{
        return await prisma.users.findFirst({
            where: { email },
        });
    },

    async update(data: updateUser, userId: number): Promise<Users>{
        return await prisma.users.update({
            where: { id: userId },
            data
        });
    }
};