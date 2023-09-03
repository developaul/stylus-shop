import { ShopLayout } from "@/layouts"
import {
  CategoryGrid, CategoryList,
  ProductSlider, Services, StoreSlider
} from "@/components"

import { products, stores } from "@/constants"

const HomePage = () => {
  return (
    <ShopLayout title="Tienda" >
      <CategoryList />
      <ProductSlider
        title="Los más vendidos"
        products={products}
      />
      <CategoryGrid />
      <StoreSlider
        stores={stores}
      />
      <Services />
    </ShopLayout>
  )
}

export default HomePage