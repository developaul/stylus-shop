import { GetStaticProps, NextPage } from "next"

import { getAllCategories, getBestProducts } from "@/server"

import {
  CategoryGrid, CategoryList,
  ProductSlider, Services, StoreSlider,
  ShopLayout
} from "@/components"

import { stores } from "@/constants"
import { Category, ShortProduct } from "@/interfaces"

interface Props {
  categories: Category[]
  bestProducts: ShortProduct[]
}

const HomePage: NextPage<Props> = ({ categories, bestProducts }) => {
  return (
    <ShopLayout title="Tienda" >
      <CategoryList categories={categories} />
      <ProductSlider
        title="Los más vendidos"
        products={bestProducts}
      />
      <CategoryGrid
        categories={categories}
      />
      <StoreSlider
        stores={stores}
      />
      <Services />
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [categories, bestProducts] = await Promise.all([
    getAllCategories(),
    getBestProducts()
  ])

  return {
    props: {
      categories,
      bestProducts
    },
    revalidate: 86_400
  }
}


export default HomePage