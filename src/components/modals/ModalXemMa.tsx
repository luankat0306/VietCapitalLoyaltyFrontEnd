import FlexBox from '@component/FlexBox'
import LazyImage from '@component/LazyImage'
import { H5 } from '@component/Typography'
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import axiosClient from '@services/axiosClient'
import { fromImageToURL } from '@utils/urls'
import { useSession } from 'next-auth/react'
import QRCode from 'qrcode.react'
import React, { FC, useState } from 'react'
import { Bill } from '_types/Bill'

interface ModalXemMaProps {
  open: boolean
  setOpen: any
  donHang: Bill
}

const ModalXemMa: FC<ModalXemMaProps> = ({ open, setOpen, donHang }) => {
  const { data: session } = useSession()
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qr, setQR] = useState('')
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClose = () => {
    setOpen && setOpen(false)
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        scroll="body"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* {session?.user ? (
          <Login />
        ) : ( */}
        <React.Fragment>
          {/* <DialogTitle id="alert-dialog-title">Thông tin đơn hàng</DialogTitle>
          <Divider /> */}
          <DialogContent>
            <Grid container spacing={5}>
              <Grid item lg={4} sm={4} xs={12}>
                {checked ? (
                  <Stack alignItems="center" justifyContent="space-around">
                    {donHang.transactionId && (
                      <Box
                        width="fit-content"
                        bgcolor="white"
                        borderRadius="8px"
                        border="1px solid"
                        padding={1}
                        borderColor={'grey.400'}
                        mb={3}
                      >
                        <QRCode
                          renderAs={'svg'}
                          size={128}
                          level="H"
                          value={qr}
                          imageSettings={{
                            src: 'https://www.vietcapitalbank.com.vn/static/images/favicon.ico',
                            excavate: true,
                            height: 20,
                            width: 20,
                          }}
                        />
                      </Box>
                    )}

                    <Box mb={3}>
                      <H5 mb={2} fontSize="13px" textAlign="center">
                        Sử dụng QR Code này tại địa điểm bạn đã chọn để đổi voucher.
                      </H5>
                      <H5 fontSize="13px" textAlign="center">
                        Cảm ơn bạn đã tin tưởng và sử dụng hệ thống của chúng tôi.
                      </H5>
                    </Box>

                    <FlexBox alignItems="center" mb={2}>
                      <Chip
                        label={donHang.product?.type}
                        color="primary"
                        variant="outlined"
                      />
                    </FlexBox>
                  </Stack>
                ) : (
                  <Stack
                    sx={{ height: '100%' }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Chip
                      label={loading ? 'Đang lấy mã ...' : 'Sử dụng'}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        setLoading(true)
                        axiosClient
                          .post<any>(
                            `f5second/bill/${session?.user?.cif}/cartPayVoucher/${donHang.transactionId}`,
                            {
                              site_customerId: session?.user?.id,
                              ttphone: '0979999067',
                              data: {
                                productId: donHang.product.id,
                                quantity: '1',
                              },
                            }
                          )
                          .then((res) => {
                            setChecked(true)
                            setQR(res.data?.data[0])
                          })
                          .catch(() => alert('Đã xảy ra lỗi'))
                          .finally(() => setLoading(false))
                      }}
                    />
                  </Stack>
                )}
              </Grid>
              <Grid item lg={8} sm={8} xs={12}>
                <Box mb={2}>
                  <LazyImage
                    sx={{ objectFit: 'cover' }}
                    src={fromImageToURL(donHang.product?.image)}
                    width={16}
                    height={9}
                    borderRadius="8px"
                    layout="responsive"
                    alt={donHang.product?.title}
                  />
                </Box>
                <Box mb={2}>
                  <Divider>Thông tin chung</Divider>
                </Box>
                <Box width="100%" ml={0} padding={1} mb={1}>
                  <FlexBox
                    style={{ display: matches ? 'block' : 'flex' }}
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Box>Tên sản phẩm:</Box>
                    <H5 ml={1}>{donHang.product?.title}</H5>
                  </FlexBox>

                  <FlexBox alignItems="center" justifyContent="space-between" mb={2}>
                    <Box>Nhãn hiệu:</Box>
                    <H5 ml={1}>{donHang.product?.brand}</H5>
                  </FlexBox>

                  <FlexBox alignItems="center" justifyContent="space-between" mb={2}>
                    <Box>Trạng thái:</Box>
                    <H5 color="success.500" ml={1}>
                      {donHang?.status === '1' ? 'Chưa sử dụng' : 'Đã sử dụng'}
                    </H5>
                  </FlexBox>
                </Box>

                {/* <Box mb={2}>
                  <Divider>Địa điểm đổi mã</Divider>
                </Box> */}

                {/* <Box
                  width="100%"
                  bgcolor="white"
                  borderRadius="7px"
                  border="1px solid"
                  style={{ cursor: 'pointer' }}
                  ml={0}
                  padding={1}
                  mb={1}
                  borderColor={'grey.400'}
                >
                  <H5 ml={1}>{donHang?.product?.office?.address}</H5>
                  <FlexBox alignItems="center">
                    <Box display="flex" alignItems="center" padding={1}>
                      <Phone fontSize="small" />
                    </Box>
                    <Box>
                      <H5>{donHang?.product?.office?.}</H5>
                    </Box>
                  </FlexBox>
                </Box> */}
              </Grid>
            </Grid>
          </DialogContent>
        </React.Fragment>
        {/* )} */}
      </Dialog>
    </React.Fragment>
  )
}
export default ModalXemMa
