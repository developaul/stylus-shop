import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { ShopLayout } from '@/components/layouts'
import {
  CategoryList, ProductSlider,
  Services, StoreSlider
} from '@/components'

import { Category } from '@/interfaces'
import { products, stores } from '@/constants'
import { getAllCategorySlugs, getCategoryBySlug } from '@/server'

interface Props {
  category: Category
}

const CategoryPage: NextPage<Props> = ({ category }) => {

  return (
    <ShopLayout title={`Ropa para ${category.title}`} >
      <CategoryList />
      <ProductSlider
        title={`Los más vendidos - ${category.title}`}
        products={products}
      />
      <StoreSlider
        stores={stores}
      />
      <Services />
    </ShopLayout >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllCategorySlugs()

  const paths = slugs.map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }

  const category = await getCategoryBySlug(slug)

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
      category
    },
    revalidate: 86_400
  }
}


export default CategoryPage