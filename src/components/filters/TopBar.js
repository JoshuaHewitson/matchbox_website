import React from 'react'
import { styleConstants as sc } from '../../config'
import { Grid, IconButton } from '@material-ui/core'
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack'

import PropertySummary from './PropertySummary'

const TopBar = (props) => {
  return (
    <Grid container alignItems='center'>
      <Grid item style={{ marginLeft: -10 }}>
        <IconButton size='medium' onClick={props.handleBackButton}>
          <ArrowBackwardIcon fontSize='inherit' />
        </IconButton>
      </Grid>
      <Grid item style={{ marginLeft: 10 }}>
        <img alt='thumb' style={{ width: 80, height: 80, borderRadius: 40, border: 'solid rgb(47,230,166) 2px' }} src={props.thumb} />
      </Grid>
      <Grid item>
        <PropertySummary {...props.item} />
      </Grid>
    </Grid>
  )
}

export default TopBar
