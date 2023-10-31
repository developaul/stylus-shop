import { GetStaticProps, NextPage } from "next"

import { getAllCategories, getBestProducts } from "@/server"

import {
  CategoryGrid, CategoryList,
  ProductSlider, Services,
  ShopLayout
} from "@/components"

import { Category, ShortProduct } from "@/interfaces"
import { Box } from "@mui/material"

interface Props {
  categories: Category[]
  bestProducts: ShortProduct[]
}

const HomePage: NextPage<Props> = ({ categories, bestProducts }) => {
  return (
    <ShopLayout title="Tienda" >
      <CategoryList categories={categories} />

      <Box sx={{ my: 8 }} />

      <ProductSlider
        title="Los más vendidos"
        products={bestProducts}
      />

      <CategoryGrid
        categories={categories}
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