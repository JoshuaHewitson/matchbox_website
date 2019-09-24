import React from 'react'
import Grid from '@material-ui/core/Grid'
// import windowSize from 'react-window-size'
// import Typography from '@material-ui/core/Typography'
import { styleConstants as sc } from '../config'

const PageSection = (props) => {
  return (
    <Grid
      container
      justify='center'
      alignitems='center'
      style={{ width: '100%', height: '100%' }}
    >
      <Grid
        container
        style={{
          width: '100%',
          height: '100%',
          maxWidth: 950,
          minHeight: 600
          // borderLeft: 'solid #dddddd 0.5px'
        }}
      >
        {props.children}
      </Grid>
    </Grid>
  )
}

export default PageSection
