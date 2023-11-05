import { RegisterForm } from '@/components/Auth'
import { AuthLayout } from '@/components/Layouts'

const Register = () => {
  return (
    <AuthLayout title='Registro'>
      <RegisterForm />
    </AuthLayout>
  )
}

export default Register