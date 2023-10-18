import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    userName: z
      .string()
      .trim()
      .min(2)
      .max(30)
      .regex(/^[a-z0-9_.]+$/, "Invalid username"),
    phoneNumber: z
      .string()
      .regex(/^9\d*$/, "Invalid phone number")
      .length(10, "Phone number must be of 10 characters"),
    email: z.string().email().trim().toLowerCase(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/, "Invalid password")
      .min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;
