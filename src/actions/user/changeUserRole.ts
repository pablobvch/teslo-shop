"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const changeUserRole = async (
  userId: string,
  // role: "admin" | "user"
  role: string
) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe estar autenticado"
    };
  }

  try {
    //esto aunque parezca redundante sirve para evitar errores de TS y de prisma
    const newRole = role === "admin" ? "admin" : "user";

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    });

    //esto es para revalidar la cache y ver el cambio inmediatamente en pantalla sin necesidad de refrescar el navegador
    revalidatePath("/admin/users");

    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo actualizar el rols"
    };
  }
};
