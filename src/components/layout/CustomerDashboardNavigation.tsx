import FlexBox from '@component/FlexBox'
import { useBills } from '@hook/bill/useBills'
import { Typography } from '@material-ui/core'
import { ConfirmationNumberOutlined, Redeem } from '@material-ui/icons'
import Person from '@material-ui/icons/Person'
import ShoppingBagOutlined from '@material-ui/icons/ShoppingBagOutlined'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { DashboardNavigationWrapper, StyledDashboardNav } from './DashboardStyle'

const CustomerDashboardNavigation = () => {
  const { data: session } = useSession()
  const { count: totalStatus1 } = useBills(session?.user?.cif, 1)
  const { count: totalStatus2 } = useBills(session?.user?.cif, 2)

  const { pathname } = useRouter()

  return (
    <DashboardNavigationWrapper sx={{ px: '0px', pb: '1.5rem', color: 'grey.900' }}>
      <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
        Quà tặng của tôi
      </Typography>
      <StyledDashboardNav
        isCurrentPath={pathname.includes('/qua-tang-cua-toi/evoucher')}
        href={'/qua-tang-cua-toi/evoucher'}
        key={'Evoucher'}
      >
        <FlexBox alignItems="center">
          <ConfirmationNumberOutlined
            className="nav-icon"
            fontSize="small"
            color="inherit"
            sx={{ mr: '10px' }}
          />

          <span>{'Evoucher'}</span>
        </FlexBox>
        <span>{totalStatus1}</span>
      </StyledDashboardNav>

      <StyledDashboardNav
        isCurrentPath={pathname.includes('/qua-tang-cua-toi/san-pham')}
        href={'/qua-tang-cua-toi/san-pham'}
        key={'Quà tặng vật lý'}
      >
        <FlexBox alignItems="center">
          <Redeem
            className="nav-icon"
            fontSize="small"
            color="inherit"
            sx={{ mr: '10px' }}
          />

          <span>Quà tặng vật lý</span>
        </FlexBox>
        <span>{0}</span>
      </StyledDashboardNav>

      {/* <StyledDashboardNav
        isCurrentPath={pathname.includes('/qua-tang-cua-toi/yeu-thich')}
        href={'/qua-tang-cua-toi/yeu-thich'}
        key={'Quà tặng yêu thích'}
      >
        <FlexBox alignItems="center">
          <FavoriteBorder
            className="nav-icon"
            fontSize="small"
            color="inherit"
            sx={{ mr: '10px' }}
          />

          <span>Quà tặng yêu thích</span>
        </FlexBox>
        <span>{count?.yeuThich}</span>
      </StyledDashboardNav> */}

      <StyledDashboardNav
        isCurrentPath={pathname.includes('/qua-tang-cua-toi/qua-tang-da-su-dung')}
        href={'/qua-tang-cua-toi/qua-tang-da-su-dung'}
        key={'Quà tặng đã sử dụng'}
      >
        <FlexBox alignItems="center">
          <ShoppingBagOutlined
            className="nav-icon"
            fontSize="small"
            color="inherit"
            sx={{ mr: '10px' }}
          />

          <span>{'Quà tặng đã sử dụng'}</span>
        </FlexBox>
        <span>{totalStatus2}</span>
      </StyledDashboardNav>
      <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
        Thông tin của bạn
      </Typography>

      <StyledDashboardNav
        isCurrentPath={pathname.includes('/tai-khoan')}
        href={'/tai-khoan'}
        key={'Thông tin cá nhân'}
      >
        <FlexBox alignItems="center">
          <Person
            className="nav-icon"
            fontSize="small"
            color="inherit"
            sx={{ mr: '10px' }}
          />

          <span>Thông tin cá nhân</span>
        </FlexBox>
        {/* <span>{item.count}</span> */}
      </StyledDashboardNav>
      {/* {linkList?.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography>
          {item.list.map((item) => (
            <StyledDashboardNav
              isCurrentPath={pathname.includes(item.href)}
              href={item.href}
              key={item.title}
            >
              <FlexBox alignItems="center">
                <item.icon
                  className="nav-icon"
                  fontSize="small"
                  color="inherit"
                  sx={{ mr: '10px' }}
                />

                <span>{item.title}</span>
              </FlexBox>
              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))} */}
    </DashboardNavigationWrapper>
  )
}

// const linkList = [
//   {
//     title: 'Quà tặng của tôi',
//     list: [
//       {
//         href: '/qua-tang-cua-toi/evoucher',
//         title: 'Evoucher',
//         icon: ConfirmationNumberOutlined,
//         count: 5,
//       },
//       {
//         href: '/qua-tang-cua-toi/san-pham',
//         title: 'Quà tặng vật lý',
//         icon: Redeem,
//         count: 1,
//       },
//       {
//         href: '/qua-tang-cua-toi/yeu-thich',
//         title: 'Quà tặng yêu thích',
//         icon: FavoriteBorder,
//         count: 19,
//       },
//       {
//         href: '/qua-tang-cua-toi/qua-tang-da-su-dung',
//         title: 'Quà tặng đã sử dụng',
//         icon: ShoppingBagOutlined,
//         count: 19,
//       },
//     ],
//   },
//   {
//     title: 'Thông tin của bạn',
//     list: [
//       {
//         href: '/tai-khoan',
//         title: 'Thông tin cá nhân',
//         icon: Person,
//         count: 0,
//       },
//       // {
//       //   href: '/address',
//       //   title: 'T',
//       //   icon: Place,
//       //   count: 16,
//       // },
//     ],
//   },
// ]

export default CustomerDashboardNavigation
