import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
// import windowSize from 'react-window-size'
// import Zoom from '@material-ui/core/Zoom'
import Typography from '@material-ui/core/Typography'
import {
  Footer,
  ContentContainer,
  HighlightLine,
  TextContainer,
  PageSection
} from '../components'
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

  renderHeading = (text) => {
    return (
      <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
        {text}
      </Typography>
    )
  }

  renderParagraph = (text) => {
    return (
      <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
        {text}
      </Typography>
    )
  }

  renderNumberPoint = (num, text) => {
    return (
      <Typography paragraph variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
        {num}. {text}
      </Typography>
    )
  }

  renderLetterPoint = (letter, text) => {
    return (
      <Typography paragraph variant='caption' style={{ marginLeft: 20, color: sc.BODY_TEXT_COLOR }}>
        {letter}. {text}
      </Typography>
    )
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
        {this.renderParagraph('Matchbox Holdings (PTY) LTD  is a registered private company under South African law with a registration number 2019/268681/07.')}
        {this.renderParagraph('At Matchbox Holdings (“Matchbox”, “we” “our” “us”) we take your privacy very seriously and it is important to us that  your personal information is kept safe and secure. The purpose of this policy is to describe the way we collect, store, use and protect information that can be associated with a specific natural or juristic person and can be used to identify that person (“personal information”). By visiting our website and using our app, you are accepting and consenting to the practices described in this policy. Please read it carefully.')}
        {this.renderHeading('INFORMATION WE OBTAIN ABOUT YOU:')}
        {this.renderNumberPoint(1, 'We may obtain personal information about you (such as your name, email address, phone number and location) when you sign up to Matchbox or use our app.')}
        {this.renderNumberPoint(2, 'We may obtain information that you upload or share onto our app, such as photographs, documents, text and images. Information that you make publicly available on the app will be visible to other Matchbox users.')}
        {this.renderNumberPoint(3, 'We may also obtain information that you provide us during correspondence with us, such as emails, sms’ or phone calls and any information you volunteer to us (such as feedback, comments and reviews).')}
        {this.renderNumberPoint(4, 'With regard to each of your visits to our site we will automatically collect the following information:')}
        {this.renderLetterPoint('a', 'Technical information, including the Internet protocol (IP) address used to connect your device to the Internet,')}
        {this.renderLetterPoint('b', 'Your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform.')}
        {this.renderHeading('HOW WE USE THIS INFORMATION:')}
        {this.renderNumberPoint(1, 'We may use your information to render services in relation to our app and to contact you when we deem it necessary.')}
        {this.renderNumberPoint(2, 'We may use your information to improve our service offering and the quality of our product.')}
        {this.renderNumberPoint(3, 'We may use your information to determine your usage of the app and to identify any breach of our terms of use.')}
        {this.renderHeading('DISCLOSURE OF INFORMATION:')}
        {this.renderNumberPoint(1, 'We will never disclose your information to third parties without your consent.')}
        {this.renderNumberPoint(2, 'You agree that we have the right to share your personal information with:')}
        {this.renderLetterPoint('a', 'Any member of our company; which means respective past, present and future employees, officers and directors of Matchbox.')}
        {this.renderHeading('COOKIES:')}
        {this.renderParagraph('Our website uses cookies to distinguish you from other users of our website.')}
        {this.renderHeading('YOUR RIGHTS:')}
        {this.renderParagraph('You have the right to ask us not to process your personal data for marketing purposes. You can also exercise the right at any time by contacting us at info@matchbox.app')}
        {this.renderParagraph('Our site and app may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies.')}
        {this.renderParagraph('We may amend this privacy policy from time to time. By accessing this site you are, and agree to be bound to the version of the privacy policy published here at the time of any visit to this site.')}
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

        <Footer width={this.state.width} />

        {/* <div style={{ position: 'fixed', top: '75%', width: '100%', height: '25%', backgroundColor: 'white' }} /> */}
      </div>
    )
  }
}

export default PrivacyPolicy
