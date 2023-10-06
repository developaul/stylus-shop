import useSWR, { SWRConfiguration } from 'swr'

import { ShortProduct } from '@/interfaces'

interface UseProductsArgs {
  url: string
  config?: SWRConfiguration
  query: Record<string, any>
}

export const useProducts = <T>({ url, query, config = {} }: UseProductsArgs) => {
  const queryParams = new URLSearchParams(query).toString()
  const { data, error, isLoading } = useSWR<T>(`/api/products/${url}?${queryParams}`, config)

  return {
    result: data,
    isError: error,
    isLoading
  }
}