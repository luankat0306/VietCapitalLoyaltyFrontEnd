import axiosClient from '@services/axiosClient'
import useSWR from 'swr'
import { Product } from '_types/Product'
import queryString from 'query-string'
const fetcher = (url: any) => axiosClient.get<any>(url).then((res) => res.data)

export function useProducts(params: any): {
  sanPhams: Product[]
  count: number
  isLoading: boolean
  error: any
} {
  const query = queryString.stringify(params)
  const { data, error } = useSWR<any>(`/f5second/lists?${query}`, fetcher)

  return {
    sanPhams: data?.data,
    count: Number(data?.total) || 0,
    isLoading: !error && !data,
    error: error,
  }
}
