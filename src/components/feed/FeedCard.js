import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ImageViewer from './ImageViewer'

const iOSBoxShadow =
  '0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(47,137,128,0.13),0 0 0 1px rgba(47,137,128,0.02)'

const GridCard = withStyles(theme => ({
  root: {
    // backgroundColor: 'white',
    transition: 'all .07s ease-in-out',
    // boxShadow: iOSBoxShadow,
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(15, 48, 44,0.2),0 0 0 1px rgba(47,137,128,0.05)'
    }
  }
}))(Grid)

const FeedCard = (props) => {
  return (
    <GridCard
      ref={ref => props.addRef(ref, props.item.key)}
      container // alignItems='center' justify='center'
      style={{
        width: '100%',
        // padding: 10,
        overflow: 'hidden',
        minWidth: 700,
        maxWidth: 1000,
        minHeight: 100,
        marginBottom: 10,
        borderRadius: 5,
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
