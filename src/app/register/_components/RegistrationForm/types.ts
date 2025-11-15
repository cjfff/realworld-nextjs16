import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export const inputsSchema = z.object({
    username: z.string().max(200).min(4, {message: 'username at least 4 characters'}),
    email: z.email({
        message: 'please input the valid email address'
    }),
    password: z.string().min(4, {
        message: 'password at least 4 characters'
    }).max(200),
});

export type Inputs = z.infer<typeof inputsSchema>;

export const resolver = zodResolver(inputsSchema);