import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

const authenticatedRoutes = ["/checkout"];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //TODO: chequear si se puede aplicar middleware en lugar de hacer la validacion manual como la estamos haciendo en el curso
      //Aparentemente a mi me funciona
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      //TODO: aca hay que ir a la BD a chequear actualizaciones del usuario de la DB para verificar compatibilidad de datos (en el caso de que se haya hecho un cambio en la DB por fuera del programa y el usuario esta logueado
      session.user = token.data as any;
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        });

        if (!user) {
          return null;
        }

        if (!bcryptjs.compareSync(password, user.password)) {
          return null;
        }

        const { password: _, ...rest } = user;

        return rest;
      }
    })
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
