import axiosClient from '@services/axiosClient'
import useSWR from 'swr'
import { Category } from '_types/Category'

const fetcher = (url: any) => axiosClient.get<any>(url).then((res) => res.data.data)

export function useCategories() {
  const { data, error } = useSWR<Category[]>('/f5second/catbyparent', fetcher)

  return {
    categories: data,
    isLoading: !error && !data,
    error: error,
  }
}
