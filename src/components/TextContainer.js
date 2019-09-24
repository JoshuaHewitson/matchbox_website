import React from 'react'
import Grid from '@material-ui/core/Grid'
import Heading from './Heading'
import Typography from '@material-ui/core/Typography'
import { styleConstants as sc } from '../config'

const TextContainer = (props) => {
  return (
    <Grid container alignItems='center' justify='center' style={{ padding: 10, marginLeft: 15, borderRadius: 10, alignItems: 'center', alignContent: 'center' }}>
      <Grid>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default TextContainer
