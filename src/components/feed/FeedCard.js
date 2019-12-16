import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ImageViewer from './ImageViewer'

const GridCard = withStyles(theme => ({
  root: {
    // backgroundColor: 'white',
    '&:hover': {
      transform: 'scale(1.01)'
    }
  }
}))(Grid)

const FeedCard = (props) => {
  return (
    <GridCard
      container // alignItems='center' justify='center'
      style={{
        width: '100%',
        // padding: 10,
        overflow: 'hidden',
        minWidth: 700,
        maxWidth: 1000,
        minHeight: 100,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white'
      }}
    >
      <Grid container flexDirection='row' style={{ maxWidth: 1000 }}>
        {props.children}
      </Grid>
    </GridCard>
  )
}

export default FeedCard
