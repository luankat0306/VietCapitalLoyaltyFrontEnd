import BazarCard from '@component/BazarCard'
import BazarRating from '@component/BazarRating'
import LazyImage from '@component/LazyImage'
import { H3, Span } from '@component/Typography'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  styled,
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import { CSSProperties } from '@material-ui/styles'
import { fromImageToURL } from '@utils/urls'
import { formatCurrency } from '@utils/utils'
import React, { useCallback, useState } from 'react'
import FlexBox from '../FlexBox'
import ProductIntro from '../products/ProductIntro'

export interface SanPhamDonHangProps {
  className?: string
  style?: CSSProperties
  rating?: number
  hoverEffect?: boolean
  imgUrl: string
  title: string
  price?: string
  off?: number
  id: string | number
  slug?: string
  hideRating?: boolean
  showProductSize?: boolean
  xemMa?: any
  layMaNgay?: any
}

const StyledBazarCard = styled(BazarCard)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  margin: 'auto',
  overflow: 'hidden',
  transition: 'all 250ms ease-in-out',
  borderRadius: '8px',

  '&:hover': {
    '& .css-1i2n18j': {
      display: 'flex',
    },
  },
}))

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}))

// const StyledChip = styled(Chip)(() => ({
//   position: 'absolute',
//   fontSize: '10px',
//   fontWeight: 600,
//   paddingLeft: 3,
//   paddingRight: 3,
//   top: '10px',
//   left: '10px',
//   zIndex: 11,
// }))

const HoverIconWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  flexDirection: 'column',
  position: 'absolute',
  top: '7px',
  right: '15px',
  cursor: 'pointer',
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}))

const ContentWrapper = styled(Box)(() => ({
  padding: '1rem',
  '& .title, & .categories': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

const SanPhamDonHang: React.FC<SanPhamDonHangProps> = ({
  off = 0,
  title,
  price,
  imgUrl,
  rating,
  hideRating,
  hoverEffect,
  showProductSize,
  xemMa,
  layMaNgay,
}) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [open, setOpen] = useState(false)

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  const toggleIsFavorite = async () => {
    setIsFavorite((fav) => !fav)
  }
  // const { state, dispatch } = useAppContext()
  // const cartItem: CartItem | undefined = state.cart.cartList.find(
  //   (item) => item.id === id
  // )
  // const handleCartAmountChange = useCallback(
  //   (amount) => () => {
  //     dispatch({
  //       type: 'CHANGE_CART_AMOUNT',
  //       payload: {
  //         name: title,
  //         qty: amount,
  //         price,
  //         imgUrl,
  //         id,
  //       },
  //     })
  //   },
  //   []
  // )
  console.log(off)
  return (
    <StyledBazarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* {off && off !== 0 && (
          <StyledChip color="primary" size="small" label={`${off}% off`} />
        )} */}

        <HoverIconWrapper>
          <IconButton sx={{ p: '6px' }} onClick={toggleDialog}>
            <RemoveRedEye color="secondary" fontSize="small" />
          </IconButton>
          <IconButton sx={{ p: '6px' }} onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
        </HoverIconWrapper>

        <Box sx={{ cursor: 'pointer' }} onClick={xemMa}>
          <LazyImage
            sx={{ objectFit: 'cover' }}
            src={fromImageToURL(imgUrl)}
            width={16}
            height={9}
            layout="responsive"
            alt={title}
          />
        </Box>
      </ImageWrapper>

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            {/* <Link href={`/product/${slug || id}`}> */}
            {/* <a> */}
            <H3
              className="title"
              fontSize="14px"
              textAlign="left"
              fontWeight="600"
              color="text.secondary"
              mb={1}
              title={title}
            >
              {title}
            </H3>
            {/* </a> */}
            {/* </Link> */}

            {!hideRating && (
              <BazarRating value={rating || 0} color="warn" readOnly />
            )}
            {showProductSize && (
              <Span color="grey.600" mb={1} display="block">
                300ml
              </Span>
            )}

            <FlexBox alignItems="center" mt={0.5}>
              <Box pr={1} fontWeight="600" color="primary.main">
                {formatCurrency(Number(price) - (Number(price) * off) / 100)}
              </Box>
              {!!off && (
                <Box color="grey.600" fontWeight="600">
                  <del>{formatCurrency(Number(price))}</del>
                </Box>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            className="add-cart"
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={'flex-start'}
            width="30px"
          >
            {layMaNgay && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ padding: '3px' }}
                onClick={layMaNgay}
              >
                <Add fontSize="small" />
              </Button>
            )}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>

      <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
        <DialogContent sx={{ paddingBottom: '1.25rem' }}>
          <ProductIntro imgUrl={[imgUrl]} title={title} price={price} />
          <IconButton
            sx={{ position: 'absolute', top: '0', right: '0' }}
            onClick={toggleDialog}
          >
            <Close className="close" fontSize="small" color="primary" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </StyledBazarCard>
  )
}

SanPhamDonHang.defaultProps = {
  id: '',
  title: '',
  imgUrl: '/assets/images/products/macbook.png',
  price: '0',
  rating: 0,
  off: 0,
}

export default SanPhamDonHang
