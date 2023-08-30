import { CategoryList } from "@/components"
import { ShopLayout } from "@/layouts"

const HomePage = () => {
  return (
    <ShopLayout title="Tienda" >
      <CategoryList />
    </ShopLayout>
  )
}

export default HomePage