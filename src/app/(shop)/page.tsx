import Image from 'next/image'
import { titleFont } from '@/config/fonts'
import { Title } from '@/components/ui/title/Title'
import { initialData } from '@/seed/seed'
import { ProductGrid } from '@/components'

const products = initialData.products

export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
