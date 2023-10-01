import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Breadcrumbs, Link, Typography } from '@mui/material'

import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getAllSubCategorySlugs,
  getSubCategoryBySlug
} from '@/server'

import {
  CategoryList,
  Services, StoreSlider,
  ShopLayout
} from '@/components'

import { Category, SubCategory } from '@/interfaces'
import { stores } from '@/constants'

interface Props {
  category: Category
  subCategory: SubCategory
}

const SubCategoryPage: NextPage<Props> = ({ category, subCategory }) => {

  return (
    <ShopLayout title={`Ropa para ${category.title}`} >
      <CategoryList />

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

  const [category, subCategory] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getSubCategoryBySlug(subCategorySlug)
  ])

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
      subCategory
    },
    revalidate: 86_400
  }
}


export default SubCategoryPage