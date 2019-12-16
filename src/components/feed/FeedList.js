import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'

const renderItems = (data, renderItem) => {
  const renderedItems = []
  for (var i = 0; i < data.length; i++) {
    renderedItems.push(renderItem(data[i]))
  }
  return renderedItems
}

const FeedList = (props) => {
  return (
    <Grid
      container alignItems='center' justify='center'
      style={{
        padding: 10,
        borderRadius: 10,
        backgroundColor: sc.LIGHT_GREY,
        alignItems: 'center',
        alignContent: 'center'
      }}
    >
      <Grid>
        {renderItems(props.data, props.renderItem)}
      </Grid>
    </Grid>
  )
}

export default FeedList
