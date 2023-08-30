import { Box, Container } from "@mui/material"

import { AuthLayout } from "@/layouts"
import { SignInForm } from "@/components"

const Signin = () => {
  return (
    <AuthLayout title="Inicia sesión">
      <SignInForm />
    </AuthLayout>
  )
}

export default Signin