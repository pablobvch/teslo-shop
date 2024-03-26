"use client";
import { titleFont } from "@/config/fonts";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import React from "react";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className={`animate-pulse mb-16`}>
        <div className="h-9 bg-gray-300" />
        <div className="h-9 bg-gray-300 mt-2" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        { invoice_id: orderId, amount: { value: roundedAmount.toString() } }
      ]
    });

    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error(`No se pudo actualizar la orden`);
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;
    await paypalCheckPayment(details.id);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
