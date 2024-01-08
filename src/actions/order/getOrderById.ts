"use server";

import { auth } from "@/auth.config";
import { CartProduct } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  /*const address = await prisma.userAddress.findUnique({
      where: { userId }
    });*/

  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe estar autenticado"
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!order) {
      throw `${id} no existe`;
    }

    if (session.user.role === "user") {
      if (session.user.id != order.userId) {
        throw `${id} no pertenece a dicho usuario`;
      }
    }

    return {
      ok: true,
      order
    };
  } catch (error) {
    console.log(error);
    return { oK: false, message: "Orden no existe" };
  }

  // const orderItems = prisma.orderItem.findMany({
  //   where: {
  //     orderId: id
  //   }
  // });

  //const productInCart: CartProduct[] = orde

  return {};
};
