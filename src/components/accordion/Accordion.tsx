import { styled } from '@material-ui/core'
import React, {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'

// component props interface
export interface AccordionProps {
  expanded?: boolean
  children: ReactElement[] | any
}
// styled component props type
type StyledWrapperProps = {
  open: boolean
  parent_height: number
  header_height: number
}
// styled component
const Wrapper = styled('div')<StyledWrapperProps>(
  ({ open, parent_height, header_height }) => ({
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'height 250ms ease-in-out',
    height: open ? parent_height : header_height,
  })
)

const Accordion: FC<AccordionProps> = ({ expanded = false, children }) => {
  const ref = useRef<any>(null)
  const [open, setOpen] = useState(expanded)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [parentHeight, setParentHeight] = useState(0)

  const toggle = () => setOpen(!open)

  useEffect(() => {
    let parent = ref.current
    if (parent) {
      setHeaderHeight(parent.children[0].scrollHeight)
      setParentHeight(parent.scrollHeight)
    }
  }, [ref.current])

  const modifiedChildren = Children.map(children, (child, ind) => {
    if (ind === 0) return cloneElement(child, { open, onClick: toggle })
    else return child
  })

  return (
    <Wrapper
      ref={ref}
      open={open}
      header_height={headerHeight}
      parent_height={parentHeight}
    >
      {modifiedChildren}
    </Wrapper>
  )
}

Accordion.defaultProps = {
  expanded: false,
}

export default Accordion
