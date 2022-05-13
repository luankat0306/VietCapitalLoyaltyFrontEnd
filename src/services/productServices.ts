import { API_URL } from '@utils/urls'
import axiosClient from '@services/axiosClient'
import { Product } from '_types/Product'
import qs from 'qs'

const sanPhamServices = {
  getProduct: (slug: any) => {
    return axiosClient
      .get<Product>(`${API_URL}/sanpham/sanphams/${slug}`)
      .then((res) => res.data)
  },

  getProducts: (params: any) => {
    return axiosClient
      .get<any>(`${API_URL}/sanpham/sanphams?${qs.stringify(params)}`)
      .then((res) => res?.data)
  },
  countSanPhams: (params: any) => {
    return axiosClient
      .get<number>(`${API_URL}/sanpham/sanphams/count?${qs.stringify(params)}`)
      .then((res) => res?.data)
  },
  timKiemSanPham: (tenSanPham: any, tenDanhMuc: any, start: any, limit: any) => {
    // &_where[_or][2][nhomSanPhams.tenNhom_contains]=${tenNhom}
    return axiosClient.get<Product[]>(
      `${API_URL}/sanpham/sanphams?_where[_or][0][tenSanPham_contains]=${tenSanPham}&_where[_or][1][danhMucs.tenDanhMuc_contains]=${tenDanhMuc}&_start=${start}&_limit=${limit}`
    )
  },
}

export default sanPhamServices
