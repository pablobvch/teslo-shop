"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // Actualizar
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });
      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });
      }

      //Carga y guardado de imagenes
      //recorrer imagenes y guardarlas en Cloudinary (por ejemplo)
      if (formData.getAll("images")) {
        const imageUrls = await uploadImages(
          formData.getAll("images") as File[]
        );
        if (!imageUrls) {
          throw new Error("No se pudo cargar las imagenes. Rollingback");
        }

        await prisma.productImage.createMany({
          data: imageUrls.map((imageUrl) => ({
            url: imageUrl!,
            productId: product.id
          }))
        });
      }

      return {
        product
      };
    });

    // Todo: RevalidatePaths
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "Revisar los logs, no se pudo actualizar/crear"
    };
  }
};

// const uploadImages = async (images: File[]) => {
//   try {
//     const uploadPromises = images.map(async (image) => {
//       try {
//         const buffer = await image.arrayBuffer();
//         const base64Image = Buffer.from(buffer).toString("base64");
//         return cloudinary.uploader
//           .upload(`data:image/png;base64,${base64Image}`)
//           .then((r) => r.secure_url);
//       } catch (error) {
//         console.log(error);
//         return null;
//       }
//     });

//     const uploadImages = await Promise.all(uploadPromises);
//     return uploadImages;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

const uploadImage = async (image: File): Promise<string | null> => {
  try {
    // Convierte el archivo de imagen a un buffer y luego a base64
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    // Sube la imagen a Cloudinary y devuelve la URL segura
    const response = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`
    );
    return response.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return null;
  }
};

const uploadImages = async (images: File[]): Promise<(string | null)[]> => {
  try {
    // Mapea las imágenes y sube cada una usando la función `uploadImage`
    const uploadPromises = images.map((image) => uploadImage(image));

    // Espera a que todas las promesas se resuelvan y devuelve los resultados
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    return [];
  }
};