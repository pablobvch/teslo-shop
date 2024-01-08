"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import okta from "next-auth/providers/okta";

export const getOrdersByUser = async () => {
  console.log("getOrderByUser");
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe estar autenticado"
    };
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      OrderAddress: {
        select: { firstName: true, lastName: true }
      }
    }
  });

  console.log({ orders });

  return {
    ok: true,
    orders
  };
};
