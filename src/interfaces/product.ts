import { Size } from "@/constants";

import { Category, SubCategory } from ".";

export interface Product {
  _id: string
  title: string
  slug: string
  images: string[]
  description: string
  inStock: number
  sizes: Size[]
  price: number
  categoryId: string
  subCategoryId: string

  category: Category
  subCategory: SubCategory
}