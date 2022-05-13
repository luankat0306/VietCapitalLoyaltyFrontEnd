import AppStore from '@component/AppStore'
import BazarIconButton from '@component/BazarIconButton'
import Image from '@component/BazarImage'
import Facebook from '@component/icons/Facebook'
import Google from '@component/icons/Google'
import Instagram from '@component/icons/Instagram'
import Twitter from '@component/icons/Twitter'
import Youtube from '@component/icons/Youtube'
import { Paragraph } from '@component/Typography'
import { Box, Container, Grid, styled } from '@material-ui/core'
import Link from 'next/link'
import React, { FC } from 'react'
import FlexBox from '../FlexBox'

// styled component
const StyledLink = styled('a')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: '0.3rem 0rem',
  color: theme.palette.grey[500],
  cursor: 'pointer',
  borderRadius: 4,

  '&:hover': {
    color: theme.palette.grey[100],
  },
}))

const Footer: FC = () => {
  return (
    <footer>
      <Box bgcolor="#0c0e30">
        <Container sx={{ p: '1rem', color: 'white' }}>
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image
                      mb={2.5}
                      src="/assets/images/logo-loyalty.jpg"
                      alt="logo"
                    />
                  </a>
                </Link>

                <Paragraph mb={2.5} color="grey.500">
                  {`Địa chỉ: 412 Nguyễn Thị Minh Khai, Phường 5, Quận 3, TP.HCM 
                  © 2017.Bản quyền thuộc Ngân hàng TMCP Bản Việt | Swift: VCBCVNVX`}
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"
                >
                  Về Bản Việt
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"
                >
                  Cá nhân
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="25px"
                  fontWeight="600"
                  mb={2.5}
                  lineHeight="1"
                  color="white"
                >
                  Liên hệ
                </Box>
                <Box py={0.6} color="grey.500">
                  Điện thoại
                </Box>
                <Box py={0.6} color="grey.500">
                  Gửi mail
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <BazarIconButton
                        m={0.5}
                        bgcolor="rgba(0,0,0,0.2)"
                        fontSize="12px"
                        padding="10px"
                      >
                        <item.icon fontSize="inherit" />
                      </BazarIconButton>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}

const aboutLinks = [
  'Tin tức',
  'Giới thiệu chung',
  'Hội đồng quản trị',
  'Quá trình phát triển',
  'Tuyển dụng',
]

const customerCareLinks = ['Khuyến mãi', 'Tài khoản và Tiết kiệm', 'Dịch vụ']

const iconList = [
  { icon: Facebook, url: 'https://www.facebook.com/UILibOfficial' },
  { icon: Twitter, url: 'https://twitter.com/uilibofficial' },
  {
    icon: Youtube,
    url: 'https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg',
  },
  { icon: Google, url: '/' },
  { icon: Instagram, url: 'https://www.instagram.com/uilibofficial/' },
]

export default Footer
