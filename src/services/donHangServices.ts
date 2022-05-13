import { API_URL } from '@utils/urls'
import axiosClient from '@services/axiosClient'
import { Bill } from '_types/Bill'

const donHangServices = {
  postDonHang: (data: any) => {
    return axiosClient.post<any>(`/f5second/bill`, data)
  },
  getDonHangs: (params: any) => {
    return axiosClient
      .get<Bill[]>(`${API_URL}/donhang/donhangs`, { params })
      .then((res) => res.data)
  },
  countDonHang: (params: any) => {
    return axiosClient
      .get<number>(`${API_URL}/donhang/donhangs/count?`, { params })
      .then((res) => res.data)
  },
}

export default donHangServices
