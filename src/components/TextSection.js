import React from 'react'
import Grid from '@material-ui/core/Grid'
// import windowSize from 'react-window-size'
import Zoom from '@material-ui/core/Zoom'
import Heading from './Heading'
import Typography from '@material-ui/core/Typography'
import { styleConstants as sc } from '../config'

const TextSection = () => {
  return (
    <Grid style={{
      padding: 10,
      marginBottom: 60,
      borderRadius: 10,
      minWidth: 500,
      // border: 'solid #dddddd 0.5px',
      backgroundColor: 'white'
    }}
    >
      <Heading text='Want to buy, sell or rent?' />
      <Typography variant='h5' align='left' paragraph style={{ maxWidth: 250, fontWeight: 'bold', color: sc.BODY_TEXT_COLOR }}>
            We're the app for you.
      </Typography>
      <Typography variant='subtitle1' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
            Matchbox is a sleek mobile app that connects private buyers, sellers and estate agents.
      </Typography>
      <Typography variant='subtitle1' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
            Users can create listings, instant message, schedule viewings and even generate an offer to buy - all in-app.
      </Typography>
    </Grid>
  )
}

export default TextSection
