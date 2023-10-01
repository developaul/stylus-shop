import { AuthLayout } from '@/components/layouts'
import { RegisterForm } from '@/components'

const Register = () => {
  return (
    <AuthLayout title='Registro'>
      <RegisterForm />
    </AuthLayout>
  )
}

export default Register