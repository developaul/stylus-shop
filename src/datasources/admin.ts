import { UserRole } from "@/constants"
import axios from "axios"

const userApi = axios.create({
  baseURL: '/api/admin'
})

export const updateUserRole = async (userId: string, role: UserRole) => {
  await userApi.put('/users', { userId, role })
}