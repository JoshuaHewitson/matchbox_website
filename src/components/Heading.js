import React from 'react'
import Grid from '@material-ui/core/Grid'
import HighlightLine from './HighlightLine'
import Typography from '@material-ui/core/Typography'
import { styleConstants as sc } from '../config'

const Heading = (props) => {
  return (
    <div>
      <div style={{ marginBottom: 20, marginTop: 20 }}>
        <HighlightLine />
      </div>
      <Typography variant='h4' align='left' paragraph style={{ maxWidth: 300, fontWeight: 'bold' }}>
        {props.text}
      </Typography>
    </div>
  )
}

export default Heading
