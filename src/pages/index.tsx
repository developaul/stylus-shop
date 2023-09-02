import { ShopLayout } from "@/layouts"
import {
  CategoryGrid, CategoryList, Footer,
  ProductSlider, Services, StoreSlider
} from "@/components"

import { products } from "@/constants"

const HomePage = () => {
  return (
    <ShopLayout title="Tienda" >
      <CategoryList />
      <ProductSlider
        title="Los más vendidos"
        products={products}
      />
      <CategoryGrid />
      {/* <StoreSlider /> */}
      <Services />
      <Footer />
    </ShopLayout>
  )
}

export default HomePage