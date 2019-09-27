import React, { PureComponent } from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import Grid from '@material-ui/core/Grid'
import phoneBackground from '../assets/phoneBackground.svg'
import slide1 from '../assets/phoneOutline3.svg'
import slide2 from '../assets/phoneOutline4.svg'
import slide3 from '../assets/phoneOutline6.svg'
import slide4 from '../assets/phoneOutline7.svg'
import '../App.css'

const slides = [
  <img key={0} class='slideAppear' style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} src={slide1} />,
  <img key={1} class='slideAppear' style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} src={slide2} />,
  <img key={2} class='slideAppear' style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} src={slide3} />,
  <img key={3} class='slideAppear' style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} src={slide4} />
]

class SlideShow extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  render () {
    const newIndex = this.state.index === slides.length - 1 ? 0 : this.state.index + 1
    setTimeout(() => {
      this.setState({
        index: newIndex
      })
    }, 3000)
    return (
      <Grid class='slide-container' style={{ width: '70%' }}>
        {slides[this.state.index]}
        <img src={phoneBackground} style={{ position: 'relative', top: 0, left: 0, zIndex: 1 }} />
      </Grid>
    )
  }
}

export default SlideShow
