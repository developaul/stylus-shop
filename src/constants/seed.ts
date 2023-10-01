import { Category } from "@/interfaces";

export const categories: Omit<Category, '_id'>[] = [
  {
    title: 'Damas',
    icon: '/category/women.svg',
    slug: 'mujer',
    image: '/images/pantalones.svg'
  },
  {
    title: 'Caballeros',
    icon: '/category/men.svg',
    slug: 'hombre',
    image: '/images/pantalones.svg'
  },
  {

    title: 'Niños',
    icon: '/category/kid.svg',
    slug: 'ninos',
    image: '/images/pantalones.svg'
  },
  {
    title: 'Bebés',
    icon: '/category/baby.svg',
    slug: 'bebes',
    image: '/images/pantalones.svg'
  }
]