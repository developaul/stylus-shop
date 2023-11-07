import axios from "axios"

import { UserRole } from "@/constants"
import { ProductFormData } from "@/interfaces"

const adminApi = axios.create({
  baseURL: '/api/admin'
})

export const updateUserRole = async (userId: string, role: UserRole) => {
  await adminApi.put('/users', { userId, role })
}

export const uploadFile = async (formData: FormData): Promise<string> => {
  const { data } = await adminApi.post<{ message: string }>('/upload', formData)

  return data.message
}

export const updateProduct = async (formData: ProductFormData) => {
  await adminApi.put('/products', formData)
}

export const createProduct = async (formData: Omit<ProductFormData, '_id'>) => {
  await adminApi.post('/products', formData)
}