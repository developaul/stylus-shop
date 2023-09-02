import { CategoryGrid, CategoryList, ProductSlider } from "@/components"
import { ShopLayout } from "@/layouts"

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
    </ShopLayout>
  )
}

export default HomePage