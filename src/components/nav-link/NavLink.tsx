import { styled } from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { AnchorHTMLAttributes } from 'react'

// component props interface
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  style?: CSSProperties
  className?: string
}
// styled component
const StyledLink = styled('a')<{ active_route?: string }>(
  ({ theme, active_route }) => ({
    position: 'relative',
    color: active_route === 'active' ? theme.palette.primary.main : 'inherit',
    transition: 'color 150ms ease-in-out',
    '&:hover': {
      color: `${theme.palette.primary.main} !important`,
    },
  })
)

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  style,
  className,
  ...props
}) => {
  const { pathname } = useRouter()

  const checkRouteMatch = () => {
    if (href === '/') return pathname === href
    return pathname.includes(href)
  }
  // active route
  const currentRoute = checkRouteMatch()

  return (
    <Link href={href}>
      <StyledLink
        active_route={currentRoute ? 'active' : ''}
        className={clsx(className)}
        href={href}
        style={style}
        {...props}
      >
        {children}
      </StyledLink>
    </Link>
  )
}

export default NavLink
