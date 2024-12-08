"use server";

import {
  SignInFormValue,
  SignInSchema,
  SignUpFormValue,
  SignUpSchema,
} from "@/schemas";

import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import db from "@/libs/db";
import { getUserByEmail } from "@/actions/user";
import { signIn } from "@/auth";

export const login = async (data: SignInFormValue) => {
  const validatedFields = SignInSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Invalid credentials!" };

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const createUser = async (data: SignUpFormValue) => {
  const validatedFields = SignUpSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email is already in use" };

  await bcrypt.hash(data.password, 10).then(async (hashedPassword) => {
    await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
  });
};
