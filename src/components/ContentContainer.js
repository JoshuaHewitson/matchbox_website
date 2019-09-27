import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../config'

const ContentContainer = (props) => {
  const shouldRender = sc.WIDTH_BREAKPOINT < props.width || props.primary
  const backgroundColor = 'white' // props.primary ? 'white' : sc.LIGHT_GREY
  if (shouldRender) {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{
          flex: 1
          // backgroundColor: backgroundColor
          // border: 'solid #dddddd 0.5px'
        }}
      >
        {props.children}
      </Grid>
    )
  }
  return null
}

export default ContentContainer
