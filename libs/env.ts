import z from "zod";
import "dotenv/config";

export const envSchema = z.object({
    DATABASE_URL: z.url(),
    DIRECT_URL: z.url(),
    JWT_SECRET: z.string(),
    ACCESS_TOKEN: z.string(),
    NODE_ENV: z.enum(["development", "production"]),
});

export const env = envSchema.parse(process.env);