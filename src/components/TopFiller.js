import React from 'react'
import { styleConstants as sc } from '../config'
import { Grid } from '@material-ui/core'

const TopFiller = (props) => {
  return (
    <Grid constainer style={{ height: sc.TOP_BAR_HEIGHT }} />
  )
}

export default TopFiller
