import React from 'react'
import { styleConstants as sc } from '../../config'
import { Typography, Divider, Box } from '@material-ui/core'

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
      <Divider />
      <Box style={{ height: 5 }} />
      {renderDescription(props.description)}
      <Divider />
      {props.children}
    </Box>
  )
}

export default PropertyDetails
