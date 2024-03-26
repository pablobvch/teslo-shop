"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: number,
  transactionId: string
) => {
  try {
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId
      }
    });
    return {
      ok: true
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error.message
    };
  }
};
