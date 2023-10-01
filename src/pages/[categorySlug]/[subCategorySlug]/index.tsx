import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Breadcrumbs, Link, Typography } from '@mui/material'

import {
  getAllCategorySlugs,
  getAllSubCategorySlugs,
  getSubCategoryBySlug,
  getAllCategories
} from '@/server'

import {
  CategoryList,
  Services, StoreSlider,
  ShopLayout,
  ProductList
} from '@/components'

import { Category, SubCategory } from '@/interfaces'
import { stores } from '@/constants'

interface Props {
  category: Category
  categories: Category[]
  subCategory: SubCategory
}

const SubCategoryPage: NextPage<Props> = ({ categories, category, subCategory }) => {

  return (
    <ShopLayout title={`Ropa para ${category.title}`} >
      <CategoryList categories={categories} />

      <Breadcrumbs
        sx={{
          my: 8,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Link
          component={NextLink}
          underline="hover"
          color="inherit"
          href="/">
          Stylus
        </Link>
        <Link
          component={NextLink}
          underline="hover"
          color="inherit"
          href={`/${category.slug}`}
        >
          {category.title}
        </Link>
        <Typography color="text.primary">{subCategory.title}</Typography>
      </Breadcrumbs>

      <ProductList
        subCategory={subCategory}
      />

      <StoreSlider
        stores={stores}
      />
      <Services />
    </ShopLayout >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [categorySlugs, subCategorySlugs] = await Promise.all([
    getAllCategorySlugs(),
    getAllSubCategorySlugs()
  ])

  const paths = categorySlugs.flatMap((categorySlug) =>
    subCategorySlugs.map((subCategorySlug) => ({ params: { categorySlug, subCategorySlug } }))
  )

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categorySlug, subCategorySlug } = params as { categorySlug: string, subCategorySlug: string }

  const [categories, subCategory] = await Promise.all([
    getAllCategories(),
    getSubCategoryBySlug(subCategorySlug)
  ])

  const category = categories.find((category) => category.slug === categorySlug)

  if (!category || !subCategory) {
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
      subCategory
    },
    revalidate: 86_400
  }
}


export default SubCategoryPage