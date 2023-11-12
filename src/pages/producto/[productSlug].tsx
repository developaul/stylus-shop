import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Breadcrumbs, Link, Typography } from '@mui/material'

import {
  getAllCategories,
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProductsByProduct
} from '@/server'

import {
  CategoryList, Services, ProductCard, ProductSlider
} from '@/components/Shop'
import { ShopLayout } from '@/components/Layouts'

import { Category, Product, ShortProduct } from '@/interfaces'

interface Props {
  categories: Category[]
  relatedProducts: ShortProduct[]
  product: Product
}

const CategoryPage: NextPage<Props> = ({ categories, product, relatedProducts }) => {

  return (
    <ShopLayout title={product.title} >
      <CategoryList
        categorySlugSelected={product.category!.slug}
        categories={categories} />

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
          href={`/${product.category!.slug}`}
        >
          {product.category!.title}
        </Link>
        <Link
          component={NextLink}
          underline="hover"
          color="inherit"
          href={`/${product.category!.slug}/${product.subCategory!.slug}`}
        >
          {product.subCategory!.title}
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <ProductCard
        product={product}
      />

      {/* TODO: Details */}

      <ProductSlider
        title={`Productos relacionados`}
        products={relatedProducts}
      />

      <Services />
    </ShopLayout >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productSlugs = await getAllProductSlugs()

  const paths = productSlugs.map((productSlug) => ({ params: { productSlug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { productSlug } = params as { productSlug: string }

  const [categories, product] = await Promise.all([
    getAllCategories(),
    getProductBySlug(productSlug)
  ])


  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const relatedProducts = await getRelatedProductsByProduct(product)

  return {
    props: {
      categories,
      relatedProducts,
      product,
    },
    revalidate: 86_400
  }
}


export default CategoryPage