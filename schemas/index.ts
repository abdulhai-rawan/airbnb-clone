import * as z from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Enter your password" }),
});

export type SignUpFormValue = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email")
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormValue = z.infer<typeof SignInSchema>;
