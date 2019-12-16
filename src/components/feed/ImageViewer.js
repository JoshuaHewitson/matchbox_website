import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography } from '@material-ui/core'
import '../../App.css'

class ImageViewer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  renderSpaces = (num, index) => {
    const spaces = []
    for (var i = 0; i < num; i++) {
      if (i === index) {
        spaces.push(
          <div
            key={i} style={{
              flex: 1,
              marginLeft: 2,
              marginBottom: 10,
              height: 3,
              backgroundColor: sc.PRIMARY_COLOR
            }}
          />)
      } else {
        spaces.push(
          <div
            key={i} style={{
              flex: 1,
              marginLeft: 2,
              marginBottom: 10,
              height: 3,
              backgroundColor: sc.PRIMARY_COLOR_OPACITY
            }}
          />)
      }
    }
    return spaces
  }

  render () {
    return (
      <Grid style={{ position: 'relative', flex: 1 }}>
        <Grid container justify='center' alignItems='flex-end' class='bottomGradient' style={{ position: 'absolute', flex: 1, top: 0, left: 0, right: 0, bottom: 0 }}>
          <Grid container alignItems='flex-end' style={{ flex: 1, height: '100%', paddingLeft: 10, paddingRight: 10 }}>
            {this.renderSpaces(this.props.images.length, this.state.index)}
          </Grid>
        </Grid>
        <img key={0} alt='screen 1' style={{ width: '100%', height: '100%', zIndex: 1000 }} src={this.props.images[this.state.index].src} />
      </Grid>
    )
  }
}

export default ImageViewer
