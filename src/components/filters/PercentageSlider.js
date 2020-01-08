import React from 'react'
import { styleConstants as sc, constants } from '../../config'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'

const iOSBoxShadow =
'0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(15, 48, 44,0.2),0 0 0 1px rgba(47,137,128,0.05)'

const StyledSlider = withStyles({
  root: {
    color: sc.SECONDARY_COLOR_DARK_2,
    height: 3,
    padding: '15px 0'
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(15, 48, 44,0.3),0 0 0 1px rgba(47,137,128,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow
      }
    },
    '& .bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  track: {
    height: 3,
    color: sc.PRIMARY_COLOR
  },
  valueLabel: {
    left: 'calc(-50% + 11px)',
    // top: -22
    '& *': {
      // background: sc.PRIMARY_COLOR_SHADOW,
      // color: '#000'
    }
  },
  rail: {
    color: sc.LIGHT_GREY,
    opacity: 1,
    height: 3
  }
})(props => <Slider valueLabelDisplay='on' {...props} />)

function ThumbComponent (props) {
  return (
    <span {...props}>
      {props.children}
      <span className='bar' />
      <span className='bar' />
      <span className='bar' />
    </span>
  )
}

function labelFormat (value) {
  return value.toFixed(0) + '%'
}

const PercentageSlider = (props) => {
  return (
    <StyledSlider
      ThumbComponent={ThumbComponent}
      {...props}
      // onChangeCommitted={(event, newValue) => props.onChangeCommitted(event, newValue)}
      // onChange={(event, newValue) => { this.priceRange = newValue }}
      // value={this.priceRange}
      valueLabelFormat={labelFormat}
      valueLabelDisplay='on'
      max={100}
      min={0}
      // defaultValue={props.defaultValue}
    />
  )
}

export default PercentageSlider
