"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store";
import React, { useEffect, useState } from "react";
import { currencyFormat } from "../../../../utils/currencyFormater";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace("/empty");
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) {
    return (
      <h1
        className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200 w-full`}
      >
        &nbsp;
      </h1>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart} {itemsInCart === 1 ? "articulo" : "articulos"}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
    </>
  );
};
