import React, { PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography } from '@material-ui/core'
import arrowRight from '../../assets/arrow_icon_right.svg'
import arrowLeft from '../../assets/arrow_icon_left.svg'
import { withStyles } from '@material-ui/core/styles'
import '../../App.css'

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const GridCard = withStyles(theme => ({
  root: {
    // backgroundColor: 'white',
    '&:hover': {
      transform: 'scale(1.05)'
      // boxShadow: iOSBoxShadow
    }
  }
}))(Grid)

class ImageViewer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  increment = (value, length) => {
    return value === length - 1 ? 0 : value + 1
  }

  decrement = (value, length) => {
    return value === 0 ? length - 1 : value - 1
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
            <Grid style={{ width: '100%' }}>
              <Grid container flexDirection='row'>
                <Grid style={{ flex: 1 }}>
                  <Typography variant='caption' style={{ color: sc.PRIMARY_COLOR }}>3 bed, 3 bath, 100m² </Typography>
                </Grid>
                <Grid container justify='flex-end' style={{ flex: 1 }}>
                  <Typography variant='caption' style={{ color: sc.PRIMARY_COLOR }}>{this.state.index + 1} / {this.props.images.length} </Typography>
                </Grid>
              </Grid>
              <Grid container>
                {this.renderSpaces(this.props.images.length, this.state.index)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify='center' alignItems='center' style={{ position: 'absolute', flex: 1, top: 0, left: 0, right: 0, bottom: 0 }}>
          <GridCard container onClick={() => this.setState({ index: this.decrement(this.state.index, this.props.images.length) })} alignItems='center' style={{ flex: 1, height: '100%' }}>
            <img alt='arrow_icon' style={{ width: '20%' }} src={arrowLeft} />
          </GridCard>
          <GridCard container onClick={() => this.setState({ index: this.increment(this.state.index, this.props.images.length) })} alignItems='center' justify='flex-end' style={{ flex: 1, height: '100%' }}>
            <img alt='arrow_icon' style={{ width: '20%' }} src={arrowRight} />
          </GridCard>
        </Grid>
        <img key={0} alt='screen 1' style={{ width: '100%', height: '100%', zIndex: 1000 }} src={this.props.images[this.state.index].src} />
      </Grid>
    )
  }
}

export default ImageViewer
