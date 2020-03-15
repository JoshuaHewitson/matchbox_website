import React from 'react'
import { styleConstants as sc } from '../config'
import { Typography, Grid, Link } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { BootstrapTooltip } from './StyledMaterialUI'

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

const formatPercentage = (value, decimalCount = 2, decimal = '.') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount
    const negativeSign = value < 0 ? '-' : ''
    const i = parseInt(value = (Math.abs(Number(value) || 0) * 100).toFixed(decimalCount)).toString()
    return negativeSign + i +
      (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : '') + '%'
  } catch (e) {
    console.log('ERR FORMAT PERCENTAGE', e)
  }
}

const formatPeriod = (value, type, decimalCount = 2, decimal = '.') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount
    const negativeSign = value < 0 ? '-' : ''
    const i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString()
    return negativeSign + i +
        (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : '') + ' ' + type
  } catch (e) {
    console.log('ERR FORMAT PERCENTAGE', e)
  }
}

const LableDisplay = (props) => {
  var variant = 'body1'
  var color = sc.BODY_TEXT_COLOR
  if (props.size === 'large' || props.size === 'medium') {
    variant = 'h6'
    color = sc.SECONDARY_COLOR_DARK_2
  }
  return (
    <BootstrapTooltip
      interactive={props.interactiveDescription}
      title={props.description === '' ? ''
        : <>
          <Typography>{props.label}</Typography>
          <em>{props.description}</em>
          {/*
          <Link color={sc.PRIMARY_COLOR} href='/'>
            <ui>read more</ui>
          </Link>
          */}
          </>}
    >
      <Grid container justify='flex-end' alignItems='center' style={{ flex: 1 }}>
        <Grid><Typography variant={variant} style={{ color: color }}>{props.label}: </Typography></Grid>
        <Grid style={{ flex: 1, backgroundColor: sc.LIGHT_GREY, height: 1, margin: 10 }} />
        {props.children}
      </Grid>
    </BootstrapTooltip>
  )
}

const Display = (props) => {
  if (props.value === -1) props.value = 'not set'
  var variant = 'h4'
  if (props.size === 'medium') variant = 'h5'
  if (props.size === 'small') variant = 'body1'
  const color = props.disabled ? sc.BODY_TEXT_COLOR : props.color
  if (props.label) {
    return (
      <LableDisplay {...props}>
        {props.display
          ? <Typography variant={variant} style={{ color: color }}>
            {props.children}
            </Typography>
          : <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
            <Link style={{ color: sc.BODY_TEXT_COLOR }} href='/pricing'>Premium only</Link>
            </Typography>}
      </LableDisplay>
    )
  } else {
    return props.display
      ? <Typography variant={variant} style={{ color: color }}>
        {props.children}
      </Typography>
      : <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        <Link style={{ color: sc.BODY_TEXT_COLOR }} href='/pricing'>Premium only</Link>
      </Typography>
  }
}

Display.defaultProps = {
  display: true,
  color: sc.PRIMARY_COLOR,
  description: ''
}

const Quantity = (props) => {
  return (
    <Typography variant='h5'>{props.children}</Typography>
  )
}

export const Percentage = (props) => {
  return <Display {...props}>{formatPercentage(props.value, props.decimal, '.')}</Display>
}

Percentage.defaultProps = {
  size: 'large',
  value: 0
}

export const Price = (props) => {
  return <Display {...props}>R {formatPrice(props.value, 0, '.', ',')}</Display>
}

Price.defaultProps = {
  size: 'large',
  value: 0
}

export const Period = (props) => {
  return <Display {...props}>{formatPeriod(props.value, props.type, props.decimal, '.')}</Display>
}

Period.defaultProps = {
  size: 'large',
  value: 0,
  type: 'years'
}

export const IncludedItem = (props) => {
  return <Display disabled={!props.included} {...props}>
    {props.quantity ? <Quantity>{props.quantity}</Quantity>
      : props.included ? <CheckIcon fontSize='medium' /> : <CloseIcon fontSize='small' />}
         </Display>
}

Period.defaultProps = {
  size: 'large',
  value: 0,
  type: 'years'
}
