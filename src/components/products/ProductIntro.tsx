import BazarAvatar from '@component/BazarAvatar'
import BazarButton from '@component/BazarButton'
import LazyImage from '@component/LazyImage'
import Login from '@component/sessions/Login'
import { H1, H2, H3, H6 } from '@component/Typography'
import { Box, Dialog, Grid, useMediaQuery, useTheme } from '@material-ui/core'
import { Place } from '@material-ui/icons'
import { fromImageToURL } from '@utils/urls'
import { formatCurrency } from '@utils/utils'
import React, { useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { Address } from '_types/Product'
import FlexBox from '../FlexBox'

export interface ProductIntroProps {
  imgUrl?: string[] | undefined
  title?: string
  price?: string | number
  id?: string | number
  brand?: string
  loaiSanPham?: string
  soLuong?: string
  diaDiemMua?: Address[]
  onClickLayMa?: () => void
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl = [],
  title,
  price = '200',
  brand = 'Khác',
  loaiSanPham,
  soLuong,
  onClickLayMa,
  diaDiemMua,
}) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const [dialogOpen, setDialogOpen] = useState(false)
  const toggleDialog = () => setDialogOpen(!dialogOpen)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const handleImageClick = (ind: number) => () => {
    setSelectedImage(ind)
  }

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb={6}>
              <LazyImage
                src={fromImageToURL(imgUrl[selectedImage])}
                onClick={() =>
                  openImageViewer(imgUrl.indexOf(imgUrl[selectedImage]))
                }
                alt={title}
                height={300}
                width={300}
                borderRadius="8px"
                loading="eager"
                objectFit="contain"
              />

              {isViewerOpen && (
                <ImageViewer
                  src={imgUrl}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                  }}
                />
              )}
            </FlexBox>
            <FlexBox overflow="auto">
              {imgUrl.map((url, ind) => (
                <Box
                  height={64}
                  width={64}
                  minWidth={64}
                  bgcolor="white"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid"
                  style={{ cursor: 'pointer' }}
                  ml={ind === 0 ? 'auto' : 0}
                  mr={ind === imgUrl.length - 1 ? 'auto' : '10px'}
                  borderColor={selectedImage === ind ? 'primary.main' : 'grey.400'}
                  onClick={handleImageClick(ind)}
                  key={ind}
                >
                  <BazarAvatar
                    src={fromImageToURL(url)}
                    variant="square"
                    height={40}
                  />
                </Box>
              ))}
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{title}</H1>

          <FlexBox alignItems="center" mb={1}>
            <Box>Loại quà tặng:</Box>
            <H6 ml={1}>{loaiSanPham}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={1}>
            <Box>Nhãn Hiệu:</Box>
            <H6 ml={1}>{brand}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box>Số Lượng:</Box>
            <H6 ml={1}>{soLuong}</H6>
          </FlexBox>

          {/* <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazarRating color="warn" fontSize="1.25rem" value={4} readOnly />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox> */}

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {formatCurrency(Number(price))}
            </H2>
          </Box>

          <BazarButton
            variant="contained"
            color="primary"
            sx={{
              mb: '36px',
              px: '1.75rem',
              height: '40px',
            }}
            onClick={onClickLayMa}
          >
            Lấy mã ngay
          </BazarButton>
          <Box ml={1} mb={1}>
            <H3>Địa điểm áp dụng: </H3>
          </Box>

          {diaDiemMua?.map((item, index) => (
            <Box
              key={index}
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
              <H6 ml={1}>{item?.address}</H6>
              <FlexBox alignItems="center">
                <Box display="flex" alignItems="center" padding={1}>
                  <Place fontSize="small" />
                </Box>
                <Box>
                  <H6>{item?.title_city}</H6>
                </Box>
              </FlexBox>
            </Box>
          ))}
        </Grid>
      </Grid>

      <Dialog
        open={dialogOpen}
        fullWidth={isMobile}
        scroll="body"
        onClose={toggleDialog}
      >
        <Login />
      </Dialog>
    </Box>
  )
}

ProductIntro.defaultProps = {
  imgUrl: [
    '/assets/images/products/headphone.png',
    '/assets/images/products/hiclipart.com (16).png',
    '/assets/images/products/hiclipart.com (18).png',
  ],
  title: '',
  price: '',
}

export default ProductIntro
