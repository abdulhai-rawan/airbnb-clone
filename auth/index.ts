import type { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authOptions from "./auth.config";
import db from "../libs/db";
import { getUserById } from "@/actions/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }: { token?: any; session: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: { strategy: "jwt" },
  ...authOptions,
});
