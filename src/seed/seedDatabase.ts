import { initialData } from "./seed";
import { countries } from "./seedCountries";
import prisma from "../lib/prisma";

async function main() {
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // generar paises

  await prisma.country.createMany({ data: countries });

  //generar categories

  const { categories, products, users } = initialData;

  await prisma.user.createMany({ data: users });

  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({ data: categoriesData });

  //generar products

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //generar productImages
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: { ...rest, categoryId: categoriesMap[type] }
    });

    const imageData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({ data: imageData });
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
