import { Service } from "@/interfaces";

import {
  LockRounded as LockRoundedIcon,
  ShoppingBasketRounded as ShoppingBasketRoundedIcon,
  GpsFixedRounded as GpsFixedRoundedIcon,
  AddTaskRounded as AddTaskRoundedIcon,
  ChromeReaderModeRounded as ChromeReaderModeRoundedIcon,
  ForumRounded as ForumRoundedIcon
} from '@mui/icons-material';

export const services: Service[] = [
  {
    _id: '1',
    description: 'En solo 6 simples pasos ve nuestro vídeo',
    Icon: LockRoundedIcon,
    title: 'Compra fácil y seguro'
  },
  {
    _id: '2',
    description: 'En nuestras 99 tiendas a nivel nacional',
    Icon: ShoppingBasketRoundedIcon,
    title: 'Cambios y devoluciones'
  },
  {
    _id: '3',
    description: 'Fácil y rápido sólo con tu DNI',
    Icon: GpsFixedRoundedIcon,
    title: 'Sigue tu pedido'
  },
  {
    _id: '4',
    description: 'Prolonga la garantía de tus productos',
    Icon: AddTaskRoundedIcon,
    title: 'Extragarantía'
  },
  {
    _id: '5',
    description: 'Nos intereza saber tu opinión',
    Icon: ChromeReaderModeRoundedIcon,
    title: 'Libro de reclamaciones'
  },
  {
    _id: '6',
    description: 'Prolonga la garantía de tus productos',
    Icon: ForumRoundedIcon,
    title: 'Servicio al cliente'
  }
]