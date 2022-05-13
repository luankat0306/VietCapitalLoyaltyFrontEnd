import { API_URL } from '@utils/urls'
import useSWR from 'swr'
import { Product } from '_types/Product'

export function useTimKiemSanPham(tuKhoa: any) {
  const { data, error } = useSWR<Product[]>(
    tuKhoa ? `${API_URL}/sanPham/sanPhams?tenSanPham_contains=${tuKhoa}` : null
  )
  if (tuKhoa !== null)
    return {
      sanPhams: data,
      isLoading: !error && !data,
      error: error,
    }
  else {
    return {
      sanPhams: [],
      isLoading: false,
      error: error,
    }
  }
}
