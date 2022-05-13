import CarouselCard1 from '@component/carousel-cards/CarouselCard1'
import CarouselCard12 from '@component/carousel-cards/CarouselCard12'
import Carousel from '@component/carousel/Carousel'
import Navbar from '@component/navbar/Navbar'
import { Box, Container } from '@material-ui/core'
import React, { FC, Fragment } from 'react'

const Section1: FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Box bgcolor="white" mb={7.5}>
        <Container sx={{ py: '2rem' }}>
          <Carousel
            totalSlides={2}
            visibleSlides={1}
            infinite={true}
            autoPlay
            showDots={true}
            showArrow={false}
            spacing="0px"
          >
            <CarouselCard1 />
            <CarouselCard12 />
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  )
}

export default Section1
