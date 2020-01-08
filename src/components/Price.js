import React from 'react'
import { styleConstants as sc } from '../config'
import { Typography } from '@material-ui/core'

const formatPrice = (price, decimalCount = 2, decimal = '.', thousands = ',') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount
    const negativeSign = price < 0 ? '-' : ''
    const i = parseInt(price = Math.abs(Number(price) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0
    return negativeSign + (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
    (decimalCount ? decimal + Math.abs(price - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log('ERR FORMAT PRICE', e)
  }
}

const Price = (props) => {
  if (props.value === -1) props.value = 'not set'
  var variant = 'h4'
  if (props.size === 'medium') variant = 'h5'
  if (props.size === 'small') variant = 'h6'
  const color = props.disabled ? sc.BODY_TEXT_COLOR : sc.PRIMARY_COLOR
  return (
    <Typography variant={variant} style={{ color: color }}>
          R {formatPrice(props.value, 0, '.', ',')}
    </Typography>
  )
}

export default Price
