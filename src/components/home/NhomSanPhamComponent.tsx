import ModalLayMa from '@component/modals/ModalLayMa'
import useWindowSize from '@hook/useWindowSize'
import { Box } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import { Product } from '_types/Product'
import Carousel from '../carousel/Carousel'
import CategorySectionCreator from '../CategorySectionCreator'
import ProductCard1 from '../product-cards/ProductCard1'

interface NhomSanPhamComponentProps {
  sanPhams: Product[]
  tenNhomSanPham: string
}
const NhomSanPhamComponent: FC<NhomSanPhamComponentProps> = ({
  sanPhams,
  tenNhomSanPham,
}) => {
  const [visibleSlides, setVisibleSlides] = useState(4)
  const width = useWindowSize()
  const [openLayMa, setOpenLayMa] = useState(false)
  const [sanPham, setSanPham] = useState<Product>()

  useEffect(() => {
    if (width < 500) setVisibleSlides(1)
    else if (width < 650) setVisibleSlides(2)
    else if (width < 950) setVisibleSlides(3)
    else setVisibleSlides(4)
  }, [width])

  const handleClickOpenLayMa = (sanPham: Product) => {
    setSanPham(sanPham)
    setOpenLayMa(true)
  }

  // const [openXemMa, setOpenXemMa] = useState(false)
  // const [donHang, setDonHang] = useState<Bill>()
  // const handleClickOpenXemMa = (item: any) => {
  //   setOpenXemMa(true)
  //   setDonHang(item)
  // }

  // const layMaNgay = async (diaDiem: DiaDiem) => {
  //   const data = {
  //     thoiGianDat: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     thoiGianGiao: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     trangThai: '1',
  //     giaTriDonHang: sanPham?.price,
  //     sanPhamMua: {
  //       id: sanPham?.id,
  //     },
  //     diaDiemMua: {
  //       id: diaDiem.id,
  //     },
  //     khachHangMua: {
  //       id: session?.user?.id,
  //     },
  //     soLuong: 1,
  //   }
  //   try {
  //     setLoadingLayMa(true)
  //     const res = await donHangServices.postDonHang(data)
  //     setLoadingLayMa(false)
  //     res && handleClickOpenXemMa(res.data?.data)
  //     setOpenLayMa(false)
  //   } catch (error) {
  //     alert('Lỗi đổi điểm')
  //   }
  // }

  return (
    <CategorySectionCreator title={tenNhomSanPham}>
      <Box mt={-0.5} mb={-0.5}>
        <Carousel
          totalSlides={sanPhams.length}
          visibleSlides={visibleSlides}
          infinite={true}
        >
          {sanPhams
            // .filter((item) => item.donViCungCap === 'URBOX')
            .map((item, ind) => {
              return (
                <Box py={0.5} key={ind}>
                  <ProductCard1
                    id={item.id}
                    imgUrl={item?.image}
                    title={item.title || ''}
                    price={item.price}
                    layMaNgay={() => handleClickOpenLayMa(item)}
                  />
                </Box>
              )
            })}
        </Carousel>

        {openLayMa && sanPham && (
          <ModalLayMa open={openLayMa} setOpen={setOpenLayMa} sanPham={sanPham} />
        )}

        {/* {openXemMa && donHang && (
          <ModalXemMa open={openXemMa} setOpen={setOpenXemMa} donHang={donHang} />
        )} */}
      </Box>
    </CategorySectionCreator>
  )
}

export default NhomSanPhamComponent
