import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography, Divider, Box, ButtonBase } from '@material-ui/core'
import Price from '../Price'
import { BootstrapTooltip } from '../StyledMaterialUI'

const renderDescription = (value) => {
  if (value) {
    return (
      <Typography noWrap displayBlock variant='caption' style={{ color: sc.BODY_TEXT_COLOR, whiteSpace: 'pre-line' }}>
        {value.replace(/(\*\*)/gm, '\n')}
      </Typography>
    )
  }
}

const renderBedroomsAndBathrooms = (value1, value2) => {
  if (value1 && value2) {
    if (value1 === -1) value1 = 'no set'
    if (value2 === -1) value2 = 'no set'
    return (
      <Grid style={{ flexDirection: 'row' }}>
        <Typography variant='boddy1' style={{ color: sc.BODY_TEXT_COLOR }}>
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

const PropertyInfo = (props) => {
  const descriptionHeight = props.full ? 5000 : 110
  return (
    <Box style={{ flex: 1, padding: 20, overflow: 'hidden' }}>
      <BootstrapTooltip title='Click to view more' placement='bottom-end'>
        <ButtonBase onClick={props.onClick}>
          <Box style={{ textAlign: 'left', width: '100%' }}>
            <Price value={props.price} size='large' />
            <Box style={{ height: 10 }} />
            <Typography variant='h6' style={{ color: sc.DARK_COLOR }}>
              {getPropertTypeDisplayText(props.property_type)} in {formatSuburb(props.suburb)}
            </Typography>
            {renderBedroomsAndBathrooms(props.num_bedrooms, props.num_bathrooms)}
            <Box style={{ height: 10 }} />
            <Divider />
            <Box style={{ height: 5 }} />
            <Box style={{ maxHeight: descriptionHeight, maxWidth: 600, overflow: 'hidden' }}>
              {renderDescription(props.description)}
            </Box>
          </Box>
        </ButtonBase>
      </BootstrapTooltip>
      <Divider />
      {props.children}
    </Box>
  )
}

export default PropertyInfo
