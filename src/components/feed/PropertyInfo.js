import React from 'react'
import Grid from '@material-ui/core/Grid'
import { styleConstants as sc } from '../../config'
import { Typography, Divider } from '@material-ui/core'
import ImageViewer from './ImageViewer'

const renderDescription = (value) => {
  if (value) {
    return (
      <Typography noWrap displayBlock variant='caption' style={{ color: sc.BODY_TEXT_COLOR, whiteSpace: 'pre-line', maxHeight: 150 }}>{value.replace(/(\*\*)/gm, '\n')}</Typography>
    )
  }
}

const formatPrice = (price, decimalCount = 2, decimal = '.', thousands = ',') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount
    const negativeSign = price < 0 ? '-' : ''
    const i = parseInt(price = Math.abs(Number(price) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0
    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(price - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log('ERR FORMAT PRICE', e)
  }
}

const renderPrice = (value) => {
  if (value) {
    if (value === -1) value = 'not set'
    return (
      <Typography variant='h4' style={{ color: sc.PRIMARY_COLOR }}>R {formatPrice(value, 0, '.', ',')}</Typography>
    )
  }
}

const renderBedroomsAndBathrooms = (value1, value2) => {
  if (value1 && value2) {
    if (value1 === -1) value1 = 'no set'
    if (value2 === -1) value2 = 'no set'
    return (
      <Grid style={{ flexDirection: 'row' }}>
        <Typography variant='boddy1' style={{ color: sc.BODY_TEXT_COLOR }}>{value1} bedrooms, {value2} bathrooms </Typography>
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
  return (
    <Grid style={{ flex: 1, padding: 20, overflow: 'hidden' }}>
      {renderPrice(props.price)}
      <div style={{ height: 10 }} />
      <Typography variant='h6' style={{ color: sc.DARK_COLOR }}>{getPropertTypeDisplayText(props.property_type)} in {formatSuburb(props.suburb)}</Typography>
      {renderBedroomsAndBathrooms(props.num_bedrooms, props.num_bathrooms)}
      <div style={{ height: 10 }} />
      <Divider />
      <div style={{ height: 5 }} />
      <div style={{ maxHeight: 110, maxWidth: 600, overflow: 'hidden' }}>
        {renderDescription(props.description)}
      </div>
      <Divider />
      {props.children}
    </Grid>
  )
}

export default PropertyInfo
