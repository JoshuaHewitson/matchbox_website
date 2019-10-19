import React from 'react'
import Grid from '@material-ui/core/Grid'
// import windowSize from 'react-window-size'
import Zoom from '@material-ui/core/Zoom'
import person1 from '../assets/person5.svg'
import appleLogo from '../assets/appleLogo.svg'
import Heading from './Heading'
import SlideShow from './SlideShow'
import Typography from '@material-ui/core/Typography'
import { styleConstants as sc } from '../config'

const TextSection = (props) => {
  if (props.width < sc.WIDTH_BREAKPOINT) {
    return (
      <Grid>
        <Grid
          container
          justify='center'
          style={{
            padding: 20,
            marginTop: 60,
            marginBottom: -70,
            borderRadius: 10,
            flex: 1,
            // minWidth: 500,
            // border: 'solid #dddddd 0.5px',
            backgroundColor: 'white'
          }}
        >
          <Grid>
            <Heading text='The easiest way to view property' />
            <Typography variant='h5' align='left' paragraph style={{ maxWidth: 250, fontWeight: 'bold', color: sc.BODY_TEXT_COLOR }}>
            Coming soon to both Android and IOS stores.
            </Typography>
            <Typography variant='subtitle1' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
            Matchbox is a sleek mobile app that makes everything about viewing property, easy.
            </Typography>
            <Typography variant='subtitle1' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
            We show you all the available properties in your area, verify them for you, go to viewings on your behalf or attend viewings with you.
            </Typography>
            {/*
            <div style={{ height: 20 }} />
            <Typography variant='h5' paragraph style={{ color: sc.DARK_COLOR, fontWeight: 'bold' }}> Coming soon!</Typography>
            <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}> To IOS and Android stores.</Typography>

            <Grid style={{ width: '10%' }}>
              <img class='appear' src={appleLogo} style={{ marginTop: 20 }} />
            </Grid>
            <Typography variant='subtitle1' style={{ color: sc.DARK_COLOR, fontWeight: 'bold' }}> Coming soon.</Typography>
            <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}> To IOS and Android.</Typography>

            */}
          </Grid>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid
        style={{
          padding: 10,
          marginBottom: 0,
          borderRadius: 10,
          flex: 1,
          // minWidth: 500,
          // border: 'solid #dddddd 0.5px',
          backgroundColor: 'white'
        }}
      >
        <Heading text='The easiest way to view property' />
        <div style={{ height: 20 }} />
        <Typography variant='h5' align='left' paragraph style={{ maxWidth: 250, fontWeight: 'bold', color: sc.BODY_TEXT_COLOR }}>
            Coming soon to both Android and IOS stores.
        </Typography>
        <Typography variant='subtitle1' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
            Matchbox is a sleek mobile app that makes everything about viewing property, easy.
        </Typography>
        <Typography variant='subtitle1' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
            We show you all the available properties in your area, verify them for you, go to viewings on your behalf or attend viewings with you.
        </Typography>
        {/*
        <div style={{ height: 20 }} />
        <Typography variant='h5' paragraph style={{ color: sc.DARK_COLOR, fontWeight: 'bold' }}> Coming soon!</Typography>
        <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}> To IOS and Android stores.</Typography>
        {/*
        <Typography variant='subtitle1' style={{ color: sc.DARK_COLOR, fontWeight: 'bold' }}> Coming soon.</Typography>
        <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}> To IOS and Android.</Typography>
        <Grid style={{ width: '10%' }}>
          <img class='appear' src={appleLogo} style={{ maxWidth: 30, marginBottom: 10 }} />
        </Grid>
        */}
      </Grid>
    )
  }
}

export default TextSection
