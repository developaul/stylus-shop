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

export const enum Size {
  'XS' = 'S',
  'S' = 'S',
  'M' = 'M',
  'L' = 'L',
  'XL' = 'XL',
  'XXL' = 'XXL',
  'XXXL' = 'XXXL'
}

export const SizeEnum = [
  Size.XS,
  Size.S,
  Size.M,
  Size.L,
  Size.XL,
  Size.XXL,
  Size.XXXL,
]