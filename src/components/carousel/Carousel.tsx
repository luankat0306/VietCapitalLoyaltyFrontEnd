import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { CSSProperties } from '@material-ui/styles'
import clsx from 'clsx'
import { Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import React, { FC, Fragment } from 'react'
import {
  StyledArrowBackButton,
  StyledArrowNextButton,
  StyledCarouselProvider,
  StyledDot,
  StyledDotGroup,
  StyledSlider,
} from './CarouselStyled'

// component props interface
export interface CarouselProps {
  naturalSlideWidth?: number
  naturalSlideHeight?: number
  totalSlides: number
  visibleSlides?: number
  currentSlide?: number
  isIntrinsicHeight?: boolean
  hasMasterSpinner?: boolean
  infinite?: boolean
  autoPlay?: boolean
  step?: number
  interval?: number
  showDots?: boolean
  showArrow?: boolean
  showArrowOnHover?: boolean
  dotClass?: string
  dotColor?: string
  dotGroupMarginTop?: string
  spacing?: string
  arrowButtonColor?: 'primary' | 'secondary' | 'inherit'
  arrowButtonClass?: string
  leftButtonClass?: string
  rightButtonClass?: string
  leftButtonStyle?: CSSProperties
  rightButtonStyle?: CSSProperties
}

const Carousel: FC<CarouselProps> = ({
  step,
  spacing,
  infinite,
  children,
  autoPlay,
  interval,
  showDots,
  dotClass,
  dotColor,
  showArrow,
  totalSlides,
  currentSlide,
  visibleSlides,
  leftButtonClass,
  leftButtonStyle,
  arrowButtonClass,
  rightButtonClass,
  rightButtonStyle,
  hasMasterSpinner,
  isIntrinsicHeight,
  naturalSlideWidth,
  dotGroupMarginTop,
  naturalSlideHeight,
}) => {
  return (
    <StyledCarouselProvider
      step={step}
      spacing={spacing}
      interval={interval}
      infinite={infinite}
      isPlaying={autoPlay}
      totalSlides={totalSlides}
      currentSlide={currentSlide}
      visibleSlides={visibleSlides}
      hasMasterSpinner={hasMasterSpinner}
      isIntrinsicHeight={isIntrinsicHeight}
      naturalSlideWidth={naturalSlideWidth || 100}
      naturalSlideHeight={naturalSlideHeight || 125}
    >
      <StyledSlider spacing={spacing}>
        {React.Children.map(children, (child, ind) => (
          <Slide index={ind}>{child}</Slide>
        ))}
      </StyledSlider>

      {showDots && (
        <StyledDotGroup
          className={clsx(dotClass)}
          dot_margin_top={dotGroupMarginTop}
          renderDots={(props: any) => renderDots({ ...props, step, dotColor })}
        />
      )}

      {showArrow && (
        <Fragment>
          <StyledArrowBackButton
            sx={{ left: '-20px' }}
            style={leftButtonStyle || {}}
            className={clsx(leftButtonClass, arrowButtonClass)}
          >
            <ArrowBack fontSize="small" color="inherit" />
          </StyledArrowBackButton>

          <StyledArrowNextButton
            sx={{ right: '-20px' }}
            style={rightButtonStyle || {}}
            className={clsx(arrowButtonClass, rightButtonClass)}
          >
            <ArrowForward fontSize="small" color="inherit" />
          </StyledArrowNextButton>
        </Fragment>
      )}
    </StyledCarouselProvider>
  )
}

const renderDots = ({
  step,
  dotColor,
  totalSlides,
  currentSlide,
  visibleSlides,
  carouselStore,
}: any) => {
  const dots = []
  const total = totalSlides - visibleSlides + 1
  // handle dot button
  const handleClick = (currentSlide: any, autoplay: boolean) => {
    carouselStore.setStoreState({
      autoPlay: autoplay,
      currentSlide: currentSlide,
    })
  }

  for (let i = 0; i < total; i += step) {
    dots.push(
      <StyledDot
        dot_color={dotColor}
        dot_active={currentSlide === i ? i + 1 : 0}
        onClick={() => handleClick(i, false)}
        key={(Math.random() * i + Date.now()).toString()}
      />
    )

    if (total - (i + 1) < step && total - (i + 1) !== 0) {
      dots.push(
        <StyledDot
          dot_color={dotColor}
          dot_active={totalSlides - visibleSlides}
          key={(Math.random() * i + Date.now()).toString()}
          onClick={() => handleClick(totalSlides - visibleSlides, false)}
        />
      )
    }
  }
  return dots
}

Carousel.defaultProps = {
  step: 1,
  interval: 2000,
  showDots: false,
  showArrow: true,
  autoPlay: false,
  infinite: false,
  totalSlides: 10,
  visibleSlides: 5,
  spacing: '1.5rem',
  naturalSlideWidth: 100,
  naturalSlideHeight: 125,
  hasMasterSpinner: false,
  isIntrinsicHeight: true,
  dotGroupMarginTop: '2rem',
  arrowButtonColor: 'secondary',
}

export default Carousel
