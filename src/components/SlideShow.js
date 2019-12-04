import React, { PureComponent } from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import Grid from '@material-ui/core/Grid'
import phoneBackground from '../assets/phoneBackground.svg'
import slide1 from '../assets/screen_shot_1.png'
import slide2 from '../assets/screen_shot_2.png'
import slide3 from '../assets/screen_shot_3.png'
import slide4 from '../assets/screen_shot_4.png'
import '../App.css'

const slides = [
  <img key={0} class='slideAppear' alt='screen 1' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} src={slide1} />,
  <img key={1} class='slideAppear' alt='screen 2' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} src={slide2} />,
  <img key={2} class='slideAppear' alt='screen 3' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} src={slide3} />,
  <img key={3} class='slideAppear' alt='screen 4' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} src={slide4} />
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
    }, 4000)
    return (
      <Grid container justify='center' alignItems='center' style={{ flex: 1 }}>
        <Grid
          class='slide-container'
          style={{
            marginTop: 50,
            overflow: 'hidden',
            paddingTop: '120%',
            width: '57%',
            // border: 'solid rgb(154, 164, 183) 3px',
            boxShadow: '7px 7px 20px 10px rgba(47,137,128, 0.2)',
            borderRadius: 30,
            backgroundColor: 'white',
            position: 'relative',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        >
          {slides[this.state.index]}
        </Grid>
      </Grid>
    )
  }
}

export default SlideShow
