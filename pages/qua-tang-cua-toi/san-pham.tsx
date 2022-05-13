import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import ModalXemMa from '@component/modals/ModalXemMa'
import SanPhamDonHang from '@component/product-cards/SanPhamDonHang'
import { Box, Container, Grid } from '@material-ui/core'
import { Redeem } from '@material-ui/icons'
import React, { useState } from 'react'
import { Bill } from '_types/Bill'

const QuaTangVatLyPage = () => {
  const [cartList] = useState<Bill[] | any>([])

  const [open, setOpen] = useState(false)
  const [donHang, setDonHang] = useState<Bill>()
  const handleClickOpen = (item: Bill) => {
    setOpen(true)
    setDonHang(item)
  }

  return (
    <CustomerDashboardLayout title="Quà tặng của tôi | Quà tặng vật lý">
      <DashboardPageHeader
        title="Quà tặng vật lý"
        icon={Redeem}
        navigation={<CustomerDashboardNavigation />}
      />
      <Container sx={{ minHeight: '30rem', mt: '50px', mb: '80px' }}>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px">
            <Grid container spacing={3}>
              {cartList.map((item: any, ind: any) => (
                <Grid item lg={4} sm={6} xs={12} key={ind}>
                  <SanPhamDonHang
                    off={item.sanPhamMua.giamGia}
                    hideRating
                    hoverEffect
                    id={item.sanPhamMua?.id}
                    slug={item.sanPhamMua?.slug}
                    title={item.sanPhamMua?.tenSanPham}
                    price={item.sanPhamMua?.giaNiemYet}
                    imgUrl={item.sanPhamMua?.anhDaiDien[0]?.url}
                    xemMa={() => handleClickOpen(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {open && donHang && (
            <ModalXemMa open={open} setOpen={setOpen} donHang={donHang} />
          )}
        </FlexBox>
      </Container>
    </CustomerDashboardLayout>
  )
}
QuaTangVatLyPage.auth = true
export default QuaTangVatLyPage
