import { Errors } from "@/backend/shared/errors/errors";
import { createUser, createUserSchema, signIn, signInSchema } from "./auth.types";
import { AuthRepository } from "./auth.repository";
import { comparePassword, hashPassword } from "@/backend/shared/database/password";
import { signJwt } from "@/libs/jwt";

export const AuthService = {
    async create(data: createUser){
        const validatedData = createUserSchema.safeParse(data);

        if(!validatedData.success) throw Errors.unauthorized("Dados inválidos");

        const { name, email, password } = validatedData.data;
        const findUser = await AuthRepository.findByEmail(email);

        if(findUser) throw Errors.unauthorized("Usuário existente");

        const hashedPassword = await hashPassword(password);
        const user =  await AuthRepository.create({ name, email, password: hashedPassword });
        const token = signJwt({
            sub: user.id,
            name: user.name,
            email: user.email,
        });

        return {
            token,
            email,
            name 
        }
    },

    async signIn(data: signIn){ 
        const validatedData = signInSchema.safeParse(data);

        if(!validatedData.success) throw Errors.validation("Invalid data", validatedData.error.message);

        const { email, password } = validatedData.data;
        const user = await AuthRepository.findByEmail(email);

        if(!user) throw Errors.unauthorized("Invalid credentials");

        const passwordMatch = await comparePassword(password, user.password);

        if(!passwordMatch) throw Errors.unauthorized("Invalid credentials");

        const token = signJwt({
            sub: user.id,
            name: user.name,
            email: user.email,
        });

        return {
            token,
            name: user.name,
            email: user.email,
        };
    },
}