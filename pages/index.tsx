import NhomSanPhamComponent from '@component/home/NhomSanPhamComponent'
import Section1 from '@component/home/Section1'
import AppLayout from '@component/layout/AppLayout'
import axiosClient from '@services/axiosClient'
import useSWR from 'swr'
import { Category } from '_types/Category'

const IndexPage = () => {
  const { data: danhMucs } = useSWR<Category[]>(
    `/f5second/catbyparent`,
    (url: any) => axiosClient.get<any>(url).then((res) => res.data.data)
  )
  return (
    <AppLayout title="Viet Capital Bank - Loyalty">
      <Section1 />
      {/* <DanhMucComponent danhMucs={danhMucs} /> */}
      {danhMucs?.map((item: any, index: any) => (
        <NhomSanPhamComponent
          key={index}
          tenNhomSanPham={item?.title}
          sanPhams={item?.product}
        />
      ))}
    </AppLayout>
  )
}

export default IndexPage
