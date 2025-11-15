import { z } from "zod";

export const schema = z.object({
    firstName: z.string().min(1, { message: "First name is required!" }),
    lastName: z.string().min(1, { message: "Last name is required!" }),
});

export type User = z.infer<typeof schema>;