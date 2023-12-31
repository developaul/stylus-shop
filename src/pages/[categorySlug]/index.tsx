import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Typography } from '@mui/material'

import {
  getAllCategorySlugs,
  getAllSubCategories,
  getAllCategories,
  getBestProductsByCategorySlug
} from '@/server'

import {
  CategoryList, ProductSlider,
  Services, SubCategoryGrid
} from '@/components/Shop'
import { ShopLayout } from '@/components/Layouts'

import { Category, ShortProduct, SubCategory } from '@/interfaces'

interface Props {
  category: Category
  categories: Category[]
  bestProducts: ShortProduct[]
  subCategories: SubCategory[]
}

const CategoryPage: NextPage<Props> = ({ categories, category, subCategories, bestProducts }) => {

  return (
    <ShopLayout title={`Ropa para ${category.title}`} >
      <CategoryList categories={categories} />

      <Typography
        sx={{ textAlign: 'center', mt: 5, mb: 2 }}
        variant='h5'
        component='h1'>
        {category.title}
      </Typography>

      <ProductSlider
        title={`Los más vendidos - ${category.title}`}
        products={bestProducts}
      />

      <SubCategoryGrid
        category={category}
        subCategories={subCategories}
      />

      <Services />
    </ShopLayout >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = await getAllCategorySlugs()

  const paths = categorySlugs.map((categorySlug) => ({ params: { categorySlug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categorySlug } = params as { categorySlug: string }

  const [categories, subCategories, bestProducts] = await Promise.all([
    getAllCategories(),
    getAllSubCategories(),
    getBestProductsByCategorySlug(categorySlug)
  ])

  const category = categories.find((category) => category.slug === categorySlug)

  if (!category) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      category,
      categories,
      bestProducts,
      subCategories
    },
    revalidate: 86_400
  }
}


export default CategoryPage