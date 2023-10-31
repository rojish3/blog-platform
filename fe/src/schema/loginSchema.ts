import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Invalid password")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/, "Invalid password"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
