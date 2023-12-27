import NextAuth, { DefaultSession } from "next-auth";
import { boolean } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      role: string;
      image: string;
    } & DefaultSession["user"];
  }
}
