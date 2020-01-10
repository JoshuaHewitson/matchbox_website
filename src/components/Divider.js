import React from 'react'
import { Grid } from '@material-ui/core'
import { styleConstants as sc } from '../config'

export const Divider = (props) => {
  return (
    <Grid style={{
      width: '100%',
      height: 1,
      marginHorizontal: props.marginHorizontal,
      marginVertical: 10,
      borderBottom: '1px solid rgba(237,242,247, 1)'
    }}
    />
  )
}

Divider.defaultProps = {
  marginHorizontal: 0,
  color: sc.LIGHT_GREY
}

export default Divider
