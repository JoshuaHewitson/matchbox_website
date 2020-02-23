import React from 'react'
import { styleConstants as sc } from '../../config'
import { Typography, Grid, Divider, Box } from '@material-ui/core'
import PropertyProfileBar from './PropertyProfileBar'

const ContactInfo = (props) => {
  return (
    <Grid justify='flex-end'>
      <Typography variant='body1' align='right' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>
        {props.name !== '' && <div style={{ color: sc.BODY_TEXT_COLOR }}>Agent name: {props.name.replace(/_/gm, ' ')}</div>}
        {props.email !== '' && <div><b>{props.email}</b></div>}
        {props.phone !== '' && <div><b>{props.phone}</b></div>}
      </Typography>
    </Grid>
  )
}

ContactInfo.defaultProps = {
  name: '',
  email: '',
  phone: ''
}

const renderDescription = (value) => {
  if (value) {
    return (
      <Typography noWrap displayBlock variant='caption' style={{ color: sc.BODY_TEXT_COLOR, whiteSpace: 'pre-line' }}>
        {value.replace(/(\*\*)/gm, '\n')}
      </Typography>
    )
  }
}

const PropertyDetails = (props) => {
  return (
    <Box style={{ flex: 1, padding: 20, paddingTop: 10, overflow: 'hidden' }}>
      <Grid container flexDirection='row' alignItems='center' justify='center'>
        <Grid style={{ flex: 1 }}>
          <PropertyProfileBar item={props.item} handleBackButton={() => props.handleBackButton()} thumb={props.item.images[0].src} />
        </Grid>
        <Grid style={{ flex: 1 }}>
          <ContactInfo email={props.details.email} phone={props.details.cell_number} name={props.details.name} />
        </Grid>
      </Grid>
      <Divider />
      <Box style={{ height: 5 }} />
      {renderDescription(props.item.description)}
      <Box style={{ height: 10 }} />
      <Divider />
      {props.children}
      <Box style={{ height: 10 }} />
    </Box>
  )
}

export default PropertyDetails
