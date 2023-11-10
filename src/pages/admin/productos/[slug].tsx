
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { DriveFileRenameOutline, } from '@mui/icons-material';

import {
  ProductModel, getAllCategories,
  getAllSubCategories, getProductBySlug
} from '@/server';
import { AdminLayout } from '@/components/Layouts';
import { ProductForm } from '@/components/Admin';

import { Category, Product, SubCategory } from '@/interfaces';

interface Props {
  product: Product;
  categories: Category[]
  subCategories: SubCategory[]
}

const ProductAdminPage: FC<Props> = ({ product, subCategories, categories }) => {
  return (
    <AdminLayout
      title={'Producto'}
      subTitle={product._id ? `Editando: ${product.title}` : 'Creando nuevo producto'}
      icon={<DriveFileRenameOutline />}
    >
      <ProductForm
        product={product}
        categories={categories}
        subCategories={subCategories}
      />
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: Product | null

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new ProductModel()))
    delete tempProduct._id

    product = tempProduct
  } else {
    product = await getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/productos',
        permanent: false,
      }
    }
  }

  const [categories, subCategories] = await Promise.all([
    getAllCategories(),
    getAllSubCategories()
  ])

  return {
    props: {
      product,
      categories,
      subCategories
    }
  }
}

export default ProductAdminPage