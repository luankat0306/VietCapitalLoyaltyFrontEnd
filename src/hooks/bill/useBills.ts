import axiosClient from '@services/axiosClient'
import useSWR from 'swr'
import { Bill } from '_types/Bill'
import queryString from 'query-string'
const fetcher = (url: any) => axiosClient.get<any>(url).then((res) => res.data)

export function useBills(
  customerId: any,
  status?: any
): { bills: Bill[]; count: number; isLoading: boolean; error: any } {
  const query = queryString.stringify({ status })
  const { data, error } = useSWR<any>(
    `/f5second/bill/${customerId}/lists?${query}`,
    fetcher
  )

  return {
    bills: data?.data,
    count: data?.total,
    isLoading: !error && !data,
    error: error,
  }
}
