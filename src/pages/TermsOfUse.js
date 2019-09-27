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

class TermsOfUse extends Component {
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

  renderBulletPoint = (text) => {
    return (
      <Grid container direction='row'>
        <Grid container justify='flex-end' alignItems='flex-start' style={{ flex: 1 }}>
          <Grid style={{ marginTop: 6, border: 'solid #8c949a 0.5px', width: 5, height: 5, borderRadius: '50%' }} />
        </Grid>
        <Grid container style={{ flex: 10 }}>
          <Typography paragraph variant='caption' style={{ marginLeft: 20, color: sc.BODY_TEXT_COLOR }}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  renderTermsOfUse = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        <div style={{ marginBottom: 40 }}>
          <Typography variant='h5' align='left' paragraph style={{ maxWidth: 200, fontWeight: 'bold' }}>
            Terms of use
          </Typography>
        </div>
        {this.renderHeading('INTRODUCTION')}
        {this.renderParagraph('The following terms and conditions apply when you use this website or the Matchbox app linked hereto. By visiting this website or using our app, you agree to adhere to the terms set out below, including the Privacy Policy or other policies which may appear elsewhere on this website or our app. We may change these terms from time to time and you are bound by the version of these terms that are set out at the time of your visiting our website or using our app.')}
        {this.renderHeading('DEFINITIONS')}
        {this.renderNumberPoint(1, 'The terms "you" and "user" as used herein refer to all individuals and/or entities accessing the website.')}
        {this.renderNumberPoint(2, 'The term "website" as used herein refers to www.matchbox.app')}
        {this.renderNumberPoint(3, 'The term “app” refers to the Matchbox app as found on Android or IOS stores')}
        {this.renderHeading('TERMS OF USE')}
        {this.renderNumberPoint(1, 'Users may not use the website in order to transmit, distribute, store or destroy material:')}
        {this.renderBulletPoint('in violation of any applicable law or regulation;')}
        {this.renderBulletPoint('in a manner that will infringe the copyright, trademark, trade secret or other intellectual property rights of others or violate the privacy, publicity or other personal rights of others;')}
        {this.renderBulletPoint('that is defamatory, obscene, threatening, abusive or hateful.')}
        {this.renderNumberPoint(2, 'The following is prohibited with respect to the website:')}
        {this.renderBulletPoint('Using any robot, spider, other automatic device or manual process to monitor or copy any part of the website;')}
        {this.renderBulletPoint('Using any device, software or routine or the like to interfere or attempt to interfere with the proper working of the website;')}
        {this.renderBulletPoint('Taking any action that imposes an unreasonable or disproportionately large load on the website infrastructure;')}
        {this.renderBulletPoint('Reverse assembling or otherwise attempting to discover any source code relating to the website and/or app, or any tool therein, except to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation; and')}
        {this.renderBulletPoint('Attempting to access any area of the website to which access is not authorized.')}
        {this.renderHeading('COPYRIGHT AND INTELLECTUAL PROPERTY RIGHTS')}
        {this.renderNumberPoint(1, 'All content, trademarks and data on this website, including but not limited to, software, databases, text, graphics, icons, hyperlinks, private information, and designs are the property of or licensed to the website.')}
        {this.renderNumberPoint(2, 'Users of this website are not granted a licence or any other right including without limitation under Copyright, Trade Mark, Patent or Intellectual Property Rights in/or to the content.')}
        {this.renderHeading('DISCLAIMER')}
        {this.renderNumberPoint(1, 'The website and our app carries property advertisements published by third parties on the website/app. We are not involved in the buying, selling or development of the property process and must not be considered to be an agent, buyer and/or a developer with respect to the use of the app/website.')}
        {this.renderNumberPoint(2, 'Matchbox shall not be responsible for any user entering into agreements or making decision whatever nature in connection with the posting of property ads, property information, personal owned property information, use of financial calculators and/or the contents thereof and/or any other information obtained on the website.')}
        {this.renderNumberPoint(3, 'Whilst we have taken reasonable measures to ensure the integrity of the website and its contents, no warranty, whether express or implied, is given that the website will operate error-free or that any files, downloads or applications available via the website are free of viruses, trojans, bombs, time-locks or any other data, code or harmful mechanisms which has the ability to corrupt or affect the operation of your system.')}
        {this.renderNumberPoint(4, 'In no event shall Matchbox, and/or any third party contributors of material to the website be liable for any costs, expenses, losses and damages of any nature (whether direct, indirect, punitive, incidental, special or consequential) arising out of or in any way connected with your use of the website, your inability to use the website and/or the operational failure of the website, and whether or not such costs, expenses, losses and damages are based on contract, delict, strict liability or otherwise.')}
        {this.renderNumberPoint(5, 'Insofar as the website contains links to any other internet websites, you acknowledge and agree that Matchbox does not have control over any such website and Matchbox shall therefore not be liable in any way for the contents of any such linked website, nor for any costs, expenses, losses or damages of any nature whatsoever arising from your access and/or use of any such website.')}
      </TextContainer>
    )
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              {this.renderTermsOfUse()}
            </ContentContainer>
          </PageSection>
        </div>

        <Footer width={this.state.width} />

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

export default TermsOfUse
