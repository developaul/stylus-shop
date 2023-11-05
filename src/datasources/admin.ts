import { UserRole } from "@/constants"
import axios from "axios"

const adminApi = axios.create({
  baseURL: '/api/admin'
})

export const updateUserRole = async (userId: string, role: UserRole) => {
  await adminApi.put('/users', { userId, role })
}