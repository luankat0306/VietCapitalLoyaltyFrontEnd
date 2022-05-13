import axiosClient from '@services/axiosClient'
import queryString from 'query-string'
import useSWR from 'swr'
const fetcher = (url: any) => axiosClient.get<any>(url).then((res) => res.data.total)

export function useCountBills(customerId: any, status?: any) {
  const query = queryString.stringify({ status })
  const { data, error } = useSWR<any>(
    `/f5second/bill/${customerId}/lists?${query}`,
    fetcher
  )

  return {
    total: data,
    isLoading: !error && !data,
    error: error,
  }
}
