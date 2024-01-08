"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import { currencyFormat } from "../../../../../utils/currencyFormater";
import { useCartStore } from "@/store";
import { titleFont } from "@/config/fonts";
import { redirect } from "next/navigation";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeProduct = useCartStore((state) => state.removeProduct);

  const productsInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <h1
        className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200 w-full h-[500px]`}
      >
        &nbsp;
      </h1>
    );
  }

  if (loaded && productsInCart.length === 0) {
    redirect("/");
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            priority
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px"
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <span>
              <p>
                {product.title} - {product.size} ({product.quantity})
              </p>
            </span>

            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
