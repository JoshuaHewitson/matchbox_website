import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography } from '@material-ui/core'

const renderItems = (data, renderItem) => {
  const renderedItems = []
  for (var i = 0; i < data.length; i++) {
    renderedItems.push(renderItem(data[i]))
  }
  if (renderedItems.length > 0) return renderedItems
  else {
    return (
      <Grid container justify='center' alignItems='center' style={{ height: 700 }}>
        <Typography variant='h2' style={{ color: sc.BODY_TEXT_COLOR }}>No results</Typography>
      </Grid>
    )
  }
}

const FeedList = (props) => {
  return (
    <Grid
      container alignItems='center' justify='center'
      style={{
        padding: 10,
        borderRadius: 10,
        // backgroundColor: sc.LIGHT_GREY,
        alignItems: 'center',
        alignContent: 'center'
      }}
    >
      <Grid>
        {renderItems(props.data, props.renderItem, props.updateCount)}
      </Grid>
    </Grid>
  )
}

export default FeedList
