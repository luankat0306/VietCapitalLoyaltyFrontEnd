import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import ModalXemMa from '@component/modals/ModalXemMa'
import SanPhamDonHang from '@component/product-cards/SanPhamDonHang'
import { useBills } from '@hook/bill/useBills'
import { Box, Container, Grid, Pagination } from '@material-ui/core'
import { ConfirmationNumberOutlined } from '@material-ui/icons'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Bill } from '_types/Bill'

function paginate(array: any[], page_size: any, page_number: any) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size) || []
}

function calculatePagesCount(pageSize: any, totalCount: any) {
  // we suppose that if we have 0 items we want 1 empty page
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
}

const EvoucherPage = () => {
  const [page, setPage] = useState(1)
  const { data: session } = useSession()
  const { bills: cartList } = useBills(session?.user?.cif, 1)
  console.log(cartList)

  const [open, setOpen] = useState(false)
  const [donHang, setDonHang] = useState<Bill>()
  const handleClickOpen = (item: Bill) => {
    setOpen(true)
    setDonHang(item)
  }

  return (
    <CustomerDashboardLayout title="Quà tặng của tôi | Evoucher">
      <DashboardPageHeader
        title="Evoucher"
        icon={ConfirmationNumberOutlined}
        navigation={<CustomerDashboardNavigation />}
      />
      <Container sx={{ minHeight: '30rem', mt: '50px', mb: '80px' }}>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px">
            <Grid container spacing={3}>
              {paginate(cartList || [], 6, page)?.map((item, ind) => (
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
        <FlexBox justifyContent="center" mt={5}>
          <Pagination
            count={calculatePagesCount(6, cartList?.length)}
            variant="outlined"
            color="primary"
            onChange={(_: React.ChangeEvent<unknown>, value: number) => {
              setPage(value)
            }}
          />
        </FlexBox>
      </Container>
    </CustomerDashboardLayout>
  )
}
EvoucherPage.auth = true
export default EvoucherPage
