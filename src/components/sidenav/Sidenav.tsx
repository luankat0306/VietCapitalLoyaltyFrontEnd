import { Drawer, styled } from '@material-ui/core'
import clsx from 'clsx'
import React, { cloneElement, FC, useEffect, useState } from 'react'

export interface SidenavProps {
  position?: 'left' | 'right'
  open?: boolean
  width?: number
  handle: React.ReactElement
  toggleSidenav?: () => void
}

const Wrapper = styled('div')(() => ({
  '& .handle': {
    cursor: 'pointer',
  },
}))

const Sidenav: FC<SidenavProps> = ({
  position,
  open,
  width,
  handle,
  children,
  toggleSidenav,
}) => {
  const [sidenavOpen, setSidenavOpen] = useState(open)

  const handleToggleSidenav = () => {
    setSidenavOpen(!sidenavOpen)
  }

  useEffect(() => {
    setSidenavOpen(open)
  }, [open])

  return (
    <Wrapper>
      <Drawer
        open={sidenavOpen}
        anchor={position}
        onClose={toggleSidenav || handleToggleSidenav}
        SlideProps={{ style: { width: width || 280 } }}
      >
        {children}
      </Drawer>

      {handle &&
        cloneElement(handle, {
          className: clsx(handle.props?.className, 'handle'),
          onClick: toggleSidenav || handleToggleSidenav,
        })}
    </Wrapper>
  )
}

Sidenav.defaultProps = {
  width: 280,
  position: 'left',
  open: false,
}

export default Sidenav
