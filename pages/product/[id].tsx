import NavbarLayout from '@component/layout/NavbarLayout'
import ModalLayMa from '@component/modals/ModalLayMa'
import ProductDescription from '@component/products/ProductDescription'
import ProductIntro from '@component/products/ProductIntro'
import ProductReview from '@component/products/ProductReview'
import { useProduct } from '@hook/product/useProduct'
import { Box, Tab, Tabs } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginTop: 80,
  marginBottom: 24,
  minHeight: 0,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  '& .inner-tab': {
    fontWeight: 600,
    minHeight: 40,
    textTransform: 'capitalize',
  },
}))

const ProductDetails = () => {
  const router = useRouter()

  const [openLayMa, setOpenLayMa] = useState(false)
  const { sanPham, error } = useProduct(router.query.id)
  if (error) router.replace('/404')
  const productInfo = {
    imgUrl: sanPham?.image ? [sanPham?.image] : [],
    title: sanPham?.title || '',
    price: sanPham?.price,
    id: sanPham?.id,
    brand: sanPham?.brand,
    discription: sanPham?.content,
    loaiSanPham: sanPham?.type,
    soLuong: sanPham?.quantity,
    diaDiemMua: sanPham?.office,
  }

  const [selectedOption, setSelectedOption] = useState(0)
  //   const classes = useStyles()

  const handleOptionClick = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedOption(newValue)
  }

  // const [openXemMa, setOpenXemMa] = useState(false)
  // const [donHang, setDonHang] = useState<Bill>()
  // const handleClickOpenXemMa = (item: any) => {
  //   setOpenXemMa(true)
  //   setDonHang(item)
  // }

  const handleClickOpenLayMa = () => {
    setOpenLayMa(true)
  }

  // const layMaNgay = async (diaDiem: DiaDiem) => {
  //   const data = {
  //     productId: sanPham?.id,
  //     site_customerId: session?.user?.id,
  //     quantity: 1,
  //   }
  //   try {
  //     const res = await donHangServices.postDonHang(data)
  //     if (res) {
  //       handleClickOpenXemMa(res?.data?.data)
  //       setOpenLayMa(false)
  //     }
  //   } catch (error) {
  //     alert('Lỗi đổi điểm')
  //   }
  // }

  return (
    <NavbarLayout>
      <ProductIntro onClickLayMa={handleClickOpenLayMa} {...productInfo} />

      <StyledTabs
        value={selectedOption}
        onChange={handleOptionClick}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab className="inner-tab" label="Mô tả" />
        <Tab className="inner-tab" label="Bình luận (3)" />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && productInfo.discription && (
          <ProductDescription discription={productInfo.discription} />
        )}
        {selectedOption === 1 && <ProductReview />}
      </Box>
      {openLayMa && sanPham && (
        <ModalLayMa open={openLayMa} setOpen={setOpenLayMa} sanPham={sanPham} />
      )}

      {/* {openXemMa && donHang && (
        <ModalXemMa open={openXemMa} setOpen={setOpenXemMa} donHang={donHang} />
      )} */}
      {/* <FrequentlyBought />

      <AvailableShops />

      <RelatedProducts /> */}
    </NavbarLayout>
  )
}

export default ProductDetails
