import { SignInForm } from "@/components/Auth"
import { AuthLayout } from '@/components/Layouts'

const Signin = () => {
  return (
    <AuthLayout title="Inicia sesión">
      <SignInForm />
    </AuthLayout>
  )
}

export default Signin