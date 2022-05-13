import BazarImage from '@component/BazarImage'
import FlexBox from '@component/FlexBox'
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout'
import CustomerDashboardNavigation from '@component/layout/CustomerDashboardNavigation'
import DashboardPageHeader from '@component/layout/DashboardPageHeader'
import { H3, H5, Small, Span } from '@component/Typography'
import { useAppContext } from '@context/app/AppContext'
import {
  Avatar,
  Button,
  Card,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core'
import Person from '@material-ui/icons/Person'
import { Box } from '@material-ui/system'
import { formatCurrency } from '@utils/utils'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
  const { state } = useAppContext()
  const { thongTin } = state.nguoiDung

  const LinearProgressLable = () => {
    return (
      <Box>
        <Box width="100%">
          <LinearProgress
            variant="determinate"
            value={100}
            classes={
              {
                // root: {},
                // colorPrimary: Style.colorPrimary,
                // barColorPrimary: Style.barColorPrimary,
              }
            }
          />
        </Box>
      </Box>
    )
  }

  return (
    <CustomerDashboardLayout>
      <DashboardPageHeader
        icon={Person}
        title="Thông tin cá nhân"
        button={
          // eslint-disable-next-line @next/next/link-passhref
          <Link href="/tai-khoan/edit">
            <Button color="primary" sx={{ px: '2rem', bgcolor: 'primary.light' }}>
              Chỉnh sửa
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />

      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card
              sx={{
                display: 'flex',
                p: '14px 32px',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <Avatar
                src="/assets/images/faces/ralph.png"
                sx={{ height: 64, width: 64 }}
              />
              <Box ml={1.5} flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid ml={0.5}>
                    <H5 my="0px">{thongTin?.hoTen || 'Luân'}</H5>
                    <FlexBox alignItems="center">
                      <Typography color="primary.main">
                        {formatCurrency(parseInt(thongTin?.soDiem || '20000', 10))}
                      </Typography>
                    </FlexBox>
                  </Grid>

                  <Typography color="grey.600" letterSpacing="0.2em">
                    SILVER USER
                  </Typography>
                </FlexBox>
              </Box>
            </Card>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      p: '22px 32px',
                    }}
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>
                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* <TableRow sx={{ p: '0.75rem 1.5rem' }}>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            First Name
          </Small>
          <span>Ralph</span>
        </FlexBox>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Last Name
          </Small>
          <span>Edwards</span>
        </FlexBox>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Email
          </Small>
          <span>{thongTin?.mail}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5} textAlign="left">
            Phone
          </Small>
          <span>{thongTin?.soDienThoai}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p={1}>
          <Small color="grey.600" mb={0.5}>
            Birth date
          </Small>
          <span className="pre">
            {thongTin?.ngayThangNamSinh &&
              format(new Date(thongTin.ngayThangNamSinh), 'dd MMM, yyyy')}
          </span>
        </FlexBox>
      </TableRow> */}

      <Grid container>
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            p: '14px 32px',
          }}
        >
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <BazarImage
                src="/assets/images/card/user-card-gold.png"
                alt="apple-watch-1"
                sx={{
                  display: 'block',
                  mx: 'auto',
                  maxHeight: 400,
                  maxWidth: '100%',
                }}
              />
            </Grid>

            <Grid item sm={6} xs={12} alignSelf="center">
              <H3 color="primary.main" mb="16px" fontWeight="600">
                Bạn đang đạt hạng cao nhất
              </H3>

              <LinearProgressLable />

              <Grid container justifyContent="space-between" mt={2}>
                <FlexBox flexDirection="column">
                  <Span fontWeight="700">Standard</Span>

                  <Small color="grey.600" mb={0.5} textAlign="left">
                    0-199
                  </Small>
                </FlexBox>

                <FlexBox flexDirection="column">
                  <Span fontWeight="700">Member</Span>

                  <Small color="grey.600" mb={0.5} textAlign="left">
                    200-999
                  </Small>
                </FlexBox>

                <FlexBox flexDirection="column">
                  <Span fontWeight="700">Loyalty</Span>

                  <Small color="grey.600" mb={0.5} textAlign="left">
                    1.000
                  </Small>
                </FlexBox>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </CustomerDashboardLayout>
  )
}

const infoList = [
  {
    title: '16.000',
    subtitle: 'Điểm hiện có',
  },
  {
    title: '4.000',
    subtitle: 'Điểm đã sử dụng ',
  },
  // {
  //   title: '00',
  //   subtitle: 'Awaiting Shipment',
  // },
  // {
  //   title: '01',
  //   subtitle: 'Awaiting Delivery',
  // },
]
Profile.auth = true
export default Profile
