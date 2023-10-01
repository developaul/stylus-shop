import { Product } from "@/interfaces";

export const products: Product[] = [
  {
    _id: '1',
    category: {
      icon: '',
      path: 'mujer',
      title: 'Damas'
    },
    image: '/images/blusa.svg',
    title: 'Blusa 1'
  },
  {
    _id: '2',
    category: {
      icon: '',
      path: 'mujer',
      title: 'Damas'
    },
    image: '/images/blusa.svg',
    title: 'Blusa 2'
  },
  {
    _id: '3',
    category: {
      icon: '',
      path: 'mujer',
      title: 'Damas'
    },
    image: '/images/blusa.svg',
    title: 'Blusa 3'
  },
  {
    _id: '4',
    category: {
      icon: '',
      path: 'mujer',
      title: 'Damas'
    },
    image: '/images/blusa.svg',
    title: 'Blusa 4'
  },
  {
    _id: '5',
    category: {
      icon: '',
      path: 'mujer',
      title: 'Damas'
    },
    image: '/images/blusa.svg',
    title: 'Blusa 5'
  },
  {
    _id: '6',
    category: {
      icon: '',
      path: 'mujer',
      title: 'Damas'
    },
    image: '/images/blusa.svg',
    title: 'Blusa 6'
  },
  {
    _id: '7',
    category: {
      icon: '',
      path: 'mujer',
      title: 'Damas'
    },
    image: '/images/blusa.svg',
    title: 'Blusa 7'
  }
]

export const enum Size {
  'XS' = 'XS',
  'S' = 'S',
  'M' = 'M',
  'L' = 'L',
  'XL' = 'XL',
  'XXL' = 'XXL',
  'XXXL' = 'XXXL',
  'All' = 'Todos'
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