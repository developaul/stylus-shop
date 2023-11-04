import Image from 'next/image'
import NextLink from 'next/link'

import { Link } from '@mui/material'

export const Logo = () => {
  return (
    <Link href={'/'} component={NextLink}>
      <Image
        priority
        src='/logo.svg'
        width={200}
        alt="Logo"
        height={60} />
    </Link>
  )
}
