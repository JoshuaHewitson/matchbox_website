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
import appStoreBadge from '../assets/App_Store_Badge.svg'
import heading from '../assets/heading.svg'

const googlePlayButton = () => {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://play.google.com/store/apps/details?id=app.matchbox&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
      style={{ height: 65 }}
    >
      <img
        style={{ maxHeight: 65, marginLeft: -15, marginBottom: -11 }}
        alt='Get it on Google Play'
        src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
      />
    </a>
  )
}

const appStoreButton = () => {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href='https://apps.apple.com/us/app/matchbox-property/id1486366818?ls=1'
      style={{ height: 100 }}
    >
      <img
        style={{ height: 43 }}
        alt='Download on the App Store'
        src={appStoreBadge}
      />
    </a>
  )
}

const renderContent = () => {
  return (
    <div>
      {/* <Heading text='The smartest way to buy property.' /> */}
      <img
        style={{ height: 150, marginLeft: -15 }}
        alt='the smartest way to buy property'
        src={heading}
      />
      <div style={{ height: 40 }} />
      <Typography variant='h6' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
        We believe that buying property is one of the most important commitments you can make.
      </Typography>
      <Typography variant='subtitle1' paragraph align='left' style={{ maxWidth: 310, color: sc.BODY_TEXT_COLOR }}>
        Our data ensures that your decision is a smart one.
      </Typography>
      <div>
        {googlePlayButton()}
        {appStoreButton()}
      </div>
    </div>
  )
}

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
            {renderContent()}
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
        {renderContent()}
      </Grid>
    )
  }
}

export default TextSection
