import { Category, SubCategory } from "@/interfaces";

export const categories: Omit<Category, '_id'>[] = [
  {
    title: 'Damas',
    icon: '/assets/icons/category/women.svg',
    slug: 'mujer',
    image: '/assets/images/category/pantalones.svg'
  },
  {
    title: 'Caballeros',
    icon: '/assets/icons/category/men.svg',
    slug: 'hombre',
    image: '/assets/images/category/pantalones.svg'
  },
  {

    title: 'Niños',
    icon: '/assets/icons/category/kid.svg',
    slug: 'ninos',
    image: '/assets/images/category/pantalones.svg'
  },
  {
    title: 'Bebés',
    icon: '/assets/icons/category/baby.svg',
    slug: 'bebes',
    image: '/assets/images/category/pantalones.svg'
  }
]

export const subCategories: Omit<SubCategory, '_id'>[] = [
  {
    title: 'Medias',
    slug: 'medias',
    image: '/assets/images/subCategory/medias.jpg'
  },
  {
    title: 'Camisetas',
    slug: 'camisetas',
    image: '/assets/images/subCategory/camiseta.jpg'
  },
  {
    title: 'Gorras',
    slug: 'gorras',
    image: '/assets/images/subCategory/gorra.jpg'
  },
]