import useRequest from '@hook/useRequest'
import { Box, styled } from '@material-ui/core'
import { API_URL } from '@utils/urls'
import React, { FC } from 'react'
import CategoryMenuItem from './CategoryMenuItem'

// component props interface
export interface CategoryMenuCardProps {
  open?: boolean
  position?: 'absolute' | 'relative'
}
// styled component
const Wrapper = styled(Box)<CategoryMenuCardProps>(({ theme, position, open }) => ({
  position: position || 'unset',
  padding: '0.5rem 0px',
  left: 0,
  right: 'auto',
  top: position === 'absolute' ? 'calc(100% + 0.7rem)' : '0.5rem',
  borderRadius: 4,
  transform: open ? 'scaleY(1)' : 'scaleY(0)',
  transformOrigin: 'top',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: 'all 250ms ease-in-out',
  zIndex: 98,
}))

const CategoryMenuCard: FC<CategoryMenuCardProps> = ({ open, position }) => {
  const { data: navigations } = useRequest<any[]>({
    method: 'GET',
    url: `${API_URL}/sanpham/danhmucs`,
  })
  // const megaMenu: any = { MegaMenu1, MegaMenu2 };

  return (
    <Wrapper open={open} position={position}>
      {navigations &&
        navigations.map((item) => {
          // let MegaMenu = megaMenu[item.menuComponent];

          return (
            <CategoryMenuItem
              title={item.tenDanhMuc}
              href={`/product/search?danhMuc=${item.slug}`}
              key={item.tenDanhMuc}
            >
              {/* <MegaMenu data={item.menuData || {}} /> */}
            </CategoryMenuItem>
          )
        })}
    </Wrapper>
  )
}

CategoryMenuCard.defaultProps = {
  position: 'absolute',
}

export default CategoryMenuCard
