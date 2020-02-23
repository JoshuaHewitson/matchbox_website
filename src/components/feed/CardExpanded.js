import React from 'react'
import { Grid } from '@material-ui/core'

import ImageViewer from './ImageViewer'
import FeedCard from './FeedCard'
import PropertyDetails from './PropertyDetails'

const CardExpanded = (props) => {
  return (
    <FeedCard expanded={props.expanded} item={props.item} key={props.item.key} addRef={(ref, key) => { props.cardRefs[key] = ref }}>
      <Grid container>
        <ImageViewer numBedrooms={props.item.num_bedrooms} numBathrooms={props.item.num_bathrooms} floorSize={props.item.floor_size} images={props.item.images} />
      </Grid>
      <Grid container>
        <PropertyDetails {...props} />
      </Grid>
    </FeedCard>
  )
}

export default CardExpanded
