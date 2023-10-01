import { GetStaticProps, NextPage } from "next"

import { getAllCategories } from "@/server"

import {
  CategoryGrid, CategoryList,
  ProductSlider, Services, StoreSlider,
  ShopLayout
} from "@/components"


import { products, stores } from "@/constants"
import { Category } from "@/interfaces"

interface Props {
  categories: Category[]
}

const HomePage: NextPage<Props> = ({ categories }) => {
  return (
    <ShopLayout title="Tienda" >
      <CategoryList categories={categories} />
      <ProductSlider
        title="Los más vendidos"
        products={products}
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
  const categories = await getAllCategories()

  return {
    props: {
      categories
    },
    revalidate: 86_400
  }
}


export default HomePage