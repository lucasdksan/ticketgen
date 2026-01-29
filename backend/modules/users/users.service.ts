import { UsersRepository } from "./users.repository";

export const UsersService = {
    async exists(id: number){
        const user = await UsersRepository.findById(id);

        return user !== null;
    }
};