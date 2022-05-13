import Image from '@component/BazarImage'
import FlexBox from '@component/FlexBox'
import ShoppingBagOutlined from '@component/icons/ShoppingBagOutlined'
import Login from '@component/sessions/Login'
import {
  Badge,
  Box,
  Container,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PersonOutline from '@material-ui/icons/PersonOutline'
import { layoutConstant } from '@utils/constants'
import { formatCurrency } from '@utils/utils'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import SearchBox from '../search-box/SearchBox'

// component props interface
interface HeaderProps {
  className?: string
}

// styled component
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: layoutConstant.headerHeight,
  background: theme.palette.background.paper,
  transition: 'height 250ms ease-in-out',

  [theme.breakpoints.down('sm')]: {
    height: layoutConstant.mobileHeaderHeight,
  },
}))

const Header: FC<HeaderProps> = ({ className }) => {
  // const [sidenavOpen, setSidenavOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  // const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const toggleDialog = () => setDialogOpen(!dialogOpen)

  const { data: session } = useSession()

  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const cartHandle = (
    <Badge badgeContent={0} color="primary">
      <Box
        component={IconButton}
        ml={2.5}
        bgcolor="grey.200"
        p={1.25}
        onClick={() => router.push('/qua-tang-cua-toi/evoucher')}
      >
        <ShoppingBagOutlined />
      </Box>
    </Badge>
  )

  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <FlexBox
          alignItems="center"
          mr={2}
          minWidth="170px"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Link href="/">
            <a>
              <Image height={40} src="/assets/images/logo-loyalty.jpg" alt="logo" />
            </a>
          </Link>

          {/* {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <BazarButton color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </BazarButton>
              </FlexBox>
            </CategoryMenu>
          )} */}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchBox />
        </FlexBox>

        <FlexBox alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
          {session?.user ? (
            <FlexBox
              ml={2}
              alignItems="center"
              bgcolor="white"
              border="1px solid #ddd"
              borderRadius="50px"
            >
              <Box
                sx={{ cursor: 'pointer' }}
                component={IconButton}
                borderRadius="50%"
                p={1.25}
                bgcolor="grey.200"
                onClick={handleClickMenu}
              >
                <PersonOutline />
              </Box>
              <Typography mx={2} color="primary.main">
                {formatCurrency(parseInt(session?.user?.soDiem || '0', 10))}
              </Typography>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    router.push('/tai-khoan')
                    handleClose()
                  }}
                >
                  Thông tin cá nhân
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    signOut()
                    handleClose()
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Menu>
            </FlexBox>
          ) : (
            <Box
              sx={{ cursor: 'pointer' }}
              borderRadius="50%"
              component={IconButton}
              p={1.25}
              bgcolor="grey.200"
              onClick={toggleDialog}
            >
              <PersonOutline />
            </Box>
          )}
          {cartHandle}
        </FlexBox>

        <Dialog
          open={dialogOpen}
          fullWidth={isMobile}
          scroll="body"
          onClose={toggleDialog}
        >
          <Login onClose={toggleDialog} />
        </Dialog>

        {/* <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart />
        </Drawer> */}
      </Container>
    </HeaderWrapper>
  )
}

export default Header
