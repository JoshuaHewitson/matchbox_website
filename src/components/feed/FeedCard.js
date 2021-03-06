import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { styleConstants as sc } from '../../config'

import { withStyles } from '@material-ui/core/styles'
import ImageViewer from './ImageViewer'

const iOSBoxShadow =
  '0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(47,137,128,0.13),0 0 0 1px rgba(47,137,128,0.02)'

const Card =
  // const border = props.selected === props.item.key ? '1px solid rgb(47,230,166)' : ''
  withStyles((props) => ({
    root: {
    // backgroundColor: 'white',
      transition: 'all .07s ease-in-out',
      border: props.border,
      boxShadow: props.boxShadow,
      // boxShadow: iOSBoxShadow,
      '&:hover': {
        transform: 'scale(1.01)',
        boxShadow: '0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(15, 48, 44,0.2),0 0 0 1px rgba(47,137,128,0.05)'
      }
    }
  }))(Box)

const FeedCard = (props) => {
  const border = props.selected === props.item.key ? '1.5px solid rgb(47,137,128)' : ''
  const boxShadow = props.selected === props.item.key ? '0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(15, 48, 44,0.2),0 0 0 1px rgba(47,137,128,0.05)' : ''
  return (
    <Card
      ref={ref => props.addRef(ref, props.item.key)}
      // container // alignItems='center' justify='center'
      border={border}
      boxShadow={boxShadow}
      {...props}
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
      {props.expanded
        ? <Grid style={{ maxWidth: 1000 }}>
          {props.children}
        </Grid>
        : <Grid container flexDirection='row' style={{ maxWidth: 1000 }}>
          {props.children}
        </Grid>}
    </Card>
  )
}

export default FeedCard
