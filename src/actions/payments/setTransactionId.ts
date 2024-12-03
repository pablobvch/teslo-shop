"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId }
    });

    if (!order) {
      return {
        ok: false,
        message: `No se encontró una orden con el ${orderId}`
      };
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message
      };
    }
    return {
      ok: false,
      message: "General Error"
    };
  }
};
