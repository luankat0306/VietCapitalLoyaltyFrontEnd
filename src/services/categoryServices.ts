import { API_URL } from '@utils/urls'
import axiosClient from '@services/axiosClient'
import { Product } from '_types/Product'
import qs from 'qs'

const categoryServices = {
  getProduct: (slug: any) => {
    return axiosClient
      .get<Product>(`${API_URL}/sanpham/sanphams/${slug}`)
      .then((res) => res.data)
  },

  getProducts: (params: any) => {
    return axiosClient
      .get<Product[]>(`${API_URL}/sanpham/sanphams?${qs.stringify(params)}`)
      .then((res) => res?.data)
  },
}

export default categoryServices
