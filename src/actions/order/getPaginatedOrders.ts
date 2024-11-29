"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import okta from "next-auth/providers/okta";

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe estar autenticado"
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        OrderAddress: {
          select: { firstName: true, lastName: true }
        }
      }
    });

    return {
      ok: true,
      orders
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error: ${error.message}`
    };
  }
};
