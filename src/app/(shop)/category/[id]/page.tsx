import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: { id: Category };
}

const products = initialData.products;

const genderMap: Record<Category, string> = {
  men: "hombres",
  women: "mujeres",
  kid: "niños",
  unisex: "todos"
};

export default function ({ params }: Props) {
  const { id } = params;

  // if (id === "kids") {
  //   notFound();
  // }

  const filteredProducts = products.filter((product) => product.gender === id);

  return (
    <>
      <Title
        title={`Articulos para ${genderMap[id]}`}
        subtitle={`Todos los productos`}
        className="mb-2"
      />
      <ProductGrid products={filteredProducts} />
    </>
  );
}
