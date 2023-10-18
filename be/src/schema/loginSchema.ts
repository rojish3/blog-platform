import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/, "Invalid password")
      .min(8, "Password must be atleast 8 characters"),
  }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
