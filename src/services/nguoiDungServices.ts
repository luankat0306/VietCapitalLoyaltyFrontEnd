import { API_URL } from '@utils/urls'
import axiosClient from '@services/axiosClient'
import { NguoiDung } from '_types/NguoiDung'

const nguoiDungServices = {
  getNguoiDung: (cif: any) => {
    return axiosClient.get<NguoiDung>(`${API_URL}/nguoidung/khachhangs/cif/${cif}`)
    // .then((res) => res.data)
    // .catch((e) => {
    //   throw e
    // })
  },
}

export default nguoiDungServices
