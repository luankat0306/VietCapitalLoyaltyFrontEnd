import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import ModalXemMa from '@component/modals/ModalXemMa'
import SanPhamDonHang from '@component/product-cards/SanPhamDonHang'
import { useBills } from '@hook/bill/useBills'
import { Box, Container, Grid } from '@material-ui/core'
import { ShoppingBagOutlined } from '@material-ui/icons'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Bill } from '_types/Bill'

const QuaTangDaSuDungPage = () => {
  const { data: session } = useSession()
  const { bills: cartList } = useBills(session?.user?.cif, 2)
  const [open, setOpen] = useState(false)
  const [donHang, setDonHang] = useState<Bill>()
  const handleClickOpen = (item: Bill) => {
    setOpen(true)
    setDonHang(item)
  }

  return (
    <CustomerDashboardLayout title="Quà tặng của tôi | Quà tặng đã sử dụng">
      <DashboardPageHeader
        title="Quà tặng đã sử dụng"
        icon={ShoppingBagOutlined}
        navigation={<CustomerDashboardNavigation />}
      />
      <Container sx={{ minHeight: '30rem', mt: '50px', mb: '80px' }}>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px">
            <Grid container spacing={3}>
              {cartList?.map((item: any, ind: any) => (
                <Grid item lg={4} sm={6} xs={12} key={ind}>
                  <SanPhamDonHang
                    hideRating
                    hoverEffect
                    id={item.product?.id}
                    title={item.product?.title}
                    price={item.product?.price}
                    imgUrl={item.product?.image}
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
QuaTangDaSuDungPage.auth = true
export default QuaTangDaSuDungPage
