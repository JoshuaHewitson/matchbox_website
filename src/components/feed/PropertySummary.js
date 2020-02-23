import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography, Box } from '@material-ui/core'
import Price from '../Price'

const renderBedroomsAndBathrooms = (value1, value2) => {
  if (value1 && value2) {
    if (value1 === -1) value1 = 'no set'
    if (value2 === -1) value2 = 'no set'
    return (
      <Grid style={{ flexDirection: 'row' }}>
        <Typography variant='body1' style={{ color: sc.BODY_TEXT_COLOR }}>
          {value1} bedrooms, {value2} bathrooms
        </Typography>
      </Grid>
    )
  }
}

const getPropertTypeDisplayText = (propertyType) => {
  switch (propertyType) {
    case 'house':
      return 'House'
    case 'apartment':
      return 'Apartment'
    case 'room_in_shared_residence':
      return 'Room'
  }
}

const formatSuburb = (string = 'not set') => {
  return string.replace(/_/g, ' ').replace(/\b([a-z])/g, x => { return x.toUpperCase() })
}

const PropertySummary = (props) => {
  return (
    <Box style={{ flex: 1, padding: 20, overflow: 'hidden' }}>
      <Price value={props.price} size='large' />
      <Typography variant='h6' style={{ color: sc.DARK_COLOR }}>
        {getPropertTypeDisplayText(props.property_type)} in {formatSuburb(props.suburb)}
      </Typography>
      {renderBedroomsAndBathrooms(props.num_bedrooms, props.num_bathrooms)}
    </Box>
  )
}

export default PropertySummary
