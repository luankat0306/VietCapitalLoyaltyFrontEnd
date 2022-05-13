import BazarButton from '@component/BazarButton'
import BazarCard from '@component/BazarCard'
import NavbarLayout from '@component/layout/NavbarLayout'
import LazyImage from '@component/LazyImage'
import { H1, Paragraph } from '@component/Typography'
import { Grid, styled } from '@material-ui/core'
import Link from 'next/link'
import React, { FC } from 'react'

// styled components
const Wrapper = styled(BazarCard)(() => ({
  textAlign: 'center',
  width: '630px',
  padding: '3rem',
}))

const StyledButton = styled(BazarButton)(() => ({
  padding: '11px 24px',
  marginTop: '2rem',
}))

const OrderConfirmation: FC = () => {
  return (
    <NavbarLayout>
      <Grid container justifyContent="center" mb="10rem">
        <Wrapper>
          <LazyImage
            src="/assets/images/illustrations/party-popper.svg"
            width={116}
            height={116}
          />
          <H1 lineHeight={1.1} mt="1.5rem">
            Your order is completed!
          </H1>
          <Paragraph color="grey.800" mt="0.3rem">
            You will be receiving confirmation email with order details.
          </Paragraph>
          <Link href="/home-1">
            <StyledButton
              className="button-link"
              variant="contained"
              color="primary"
              disableElevation
            >
              Browse products
            </StyledButton>
          </Link>
        </Wrapper>
      </Grid>
    </NavbarLayout>
  )
}

export default OrderConfirmation
