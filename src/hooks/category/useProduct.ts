import axiosClient from '@services/axiosClient'
import useSWR from 'swr'
import { Product } from '_types/Product'
const fetcher = (url: any) => axiosClient.get<Product>(url).then((res) => res.data)

export function useProduct(slug: any) {
  const { data, error } = useSWR<Product>(
    () => (slug ? `/f5second/detail/${slug}` : null),
    fetcher
  )

  return {
    sanPham: data,
    isLoading: !error && !data,
    error: error,
  }
}
