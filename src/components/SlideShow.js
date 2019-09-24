import React from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import slide1 from '../assets/phoneOutline3.svg'
import slide2 from '../assets/phoneOutline4.svg'
import slide3 from '../assets/phoneOutline6.svg'
import '../App.css'

const images = [
  slide1,
  slide2,
  slide3
]

const fadeProperties = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: true,
  indicators: false,
  arrows: false,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`)
  }
}

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 400,
  infinite: true,
  indicators: false,
  scale: 1.1,
  arrows: false
}

const sliderPros = {
  autoplay: 2000,
  previousButton: null,
  nextButton: null
  // disabled: true
}

const SlideShow = () => {
  return (
    <div className='slide-container' style={{ width: '100%', height: 1000, paddingTop: 20, backgroundColor: 'red' }}>
      <Slider {...sliderPros} style={{ height: 1000 }}>
        {images.map((item, index) => {
          return (<img class='phoneImage' key={index} style={{ height: 1000 }} src={images[index]} />)
        })}
      </Slider>
    </div>
  )
}

export default SlideShow
