import { AuthLayout } from '@/layouts'
import { RegisterForm } from '@/components'

const Register = () => {
  return (
    <AuthLayout title='Registro'>
      <RegisterForm />
    </AuthLayout>
  )
}

export default Register