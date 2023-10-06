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

export interface ShortProduct extends Pick<Product, '_id' | 'images' | 'title' | 'slug'> { }

export interface PreviewProduct extends Pick<Product, '_id' | 'images' | 'title' | 'slug' | 'price' | 'inStock'> { }

export interface CartProduct extends Pick<Product, '_id' | 'slug' | 'title' | 'inStock' | 'price'> {
  image: string;
  quantity: number;
  size?: Size
}

export interface FavoriteProduct extends Pick<Product, '_id' | 'slug' | 'title'> {
  image: string;
}