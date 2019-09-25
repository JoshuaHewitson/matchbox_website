import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
// import windowSize from 'react-window-size'
// import Zoom from '@material-ui/core/Zoom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Typography'
import phoneOutline1 from '../assets/phoneOutline6.svg'
import phoneOutline2 from '../assets/phoneOutline3.svg'
import phoneOutline3 from '../assets/phoneOutline4.svg'
import testPic1 from '../assets/testPic1.png'
import testPic2 from '../assets/testPic2.png'
import plant1 from '../assets/plant1.svg'
import plant2 from '../assets/plant2.svg'
import person1 from '../assets/person1.svg'
import greenBackgroundShape1 from '../assets/greenBackgroundShape1.svg'
import building1 from '../assets/building1.svg'
import {
  TopBar,
  SlideShow,
  Heading,
  ContentContainer,
  HighlightLine,
  Step,
  TextContainer,
  PageSection,
  TextSection,
  PageIndicatorDots
} from '../components'
import ScrollAnimation from 'react-animate-on-scroll'
import { styleConstants as sc } from '../config'
import 'animate.css/animate.min.css'
import '../App.css'

class PrivacyPolicy extends Component {
  constructor () {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount = () => {
    // window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount = () => {
    // window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  renderPrivacyPolicy = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        <div style={{ marginBottom: 40 }}>
          <Typography variant='h5' align='left' paragraph style={{ maxWidth: 200, fontWeight: 'bold' }}>
            Privacy policy
          </Typography>
        </div>
        <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
        Matchbox Holdings (PTY) LTD  is a registered private company under South African law with a registration number 2019/268681/07.
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        At Matchbox Holdings (“Matchbox”, “we” “our” “us”) we take your privacy very seriously and it is important to us that  your personal information is kept safe and secure. The purpose of this policy is to describe the way we collect, store, use and protect information that can be associated with a specific natural or juristic person and can be used to identify that person (“personal information”). By visiting our website and using our app, you are accepting and consenting to the practices described in this policy. Please read it carefully.
        </Typography>
        <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
        INFORMATION WE OBTAIN ABOUT YOU:
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        1. We may obtain personal information about you (such as your name, email address, phone number and location) when you sign up to Matchbox or use our app.
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        2. We may obtain information that you upload or share onto our app, such as photographs, documents, text and images. Information that you make publicly available on the app will be visible to other Matchbox users.
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        3. We may also obtain information that you provide us during correspondence with us, such as emails, sms’ or phone calls and any information you volunteer to us (such as feedback, comments and reviews).
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        4. With regard to each of your visits to our site we will automatically collect the following information:
        </Typography>
        <Typography paragraph variant='caption' style={{ marginLeft: 20, color: sc.BODY_TEXT_COLOR }}>
        a. Technical information, including the Internet protocol (IP) address used to connect your device to the Internet,
        </Typography>
        <Typography paragraph variant='caption' style={{ marginLeft: 20, color: sc.BODY_TEXT_COLOR }}>
        b. Your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform.
        </Typography>
        <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
        HOW WE USE THIS INFORMATION:
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        1. We may use your information to render services in relation to our app and to contact you when we deem it necessary.
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        2. We may use your information to improve our service offering and the quality of our product.
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        3. We may use your information to determine your usage of the app and to identify any breach of our terms of use.
        </Typography>
        <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
        DISCLOSURE OF INFORMATION:
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        1. We will never disclose your information to third parties without your consent.
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        2. You agree that we have the right to share your personal information with:
        </Typography>
        <Typography paragraph variant='caption' style={{ marginLeft: 20, color: sc.BODY_TEXT_COLOR }}>
        a. Any member of our company; which means respective past, present and future employees, officers and directors of Matchbox.
        </Typography>
        <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
        COOKIES:
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        Our website uses cookies to distinguish you from other users of our website.
        </Typography>
        <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
        YOUR RIGHTS:
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        You have the right to ask us not to process your personal data for marketing purposes. You can also exercise the right at any time by contacting us at info@matchbox.app
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        Our site and app may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies.
        </Typography>
        <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        We may amend this privacy policy from time to time. By accessing this site you are, and agree to be bound to the version of the privacy policy published here at the time of any visit to this site.
        </Typography>

      </TextContainer>
    )
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              {this.renderPrivacyPolicy()}
            </ContentContainer>
          </PageSection>
        </div>

        <div style={{ height: 200, backgroundColor: sc.LIGHT_GREY }}>
          <Grid container justify='center' alignItems='flex-end' style={{ height: '100%', padding: 20 }}>
            <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>Copyright © 2019 Matchbox Holdings (PTY) Ltd. All rights reserved.</Typography>
          </Grid>
        </div>

        {/* <div style={{ position: 'fixed', top: '75%', width: '100%', height: '25%', backgroundColor: 'white' }} /> */}
        <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'left top 0', position: 'fixed', top: '540px', left: '50px', width: '25%', height: '5%', color: sc.BODY_TEXT_COLOR }}>
          <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>Hold your breath.</Typography>
          <Typography variant='caption' style={{ color: sc.DARK_COLOR, fontWeight: 'bold' }}> Coming soon</Typography>
          <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}> to IOS and Android</Typography>
        </div>
      </div>
    )
  }
}

export default PrivacyPolicy
