import bcrypt from "bcrypt";
import { SignInSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail } from "@/actions/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          console.log("validated successfully");
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.hashedPassword) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          if (passwordMatch) return user;
        }

        console.log("user not validated");
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/error",
  },
  trustHost: true,
} satisfies NextAuthConfig;
