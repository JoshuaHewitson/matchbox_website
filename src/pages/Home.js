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
import person1 from '../assets/person3.svg'
import person2 from '../assets/person4.svg'
import person3 from '../assets/person5.svg'
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
  PageIndicatorDots,
  Footer
} from '../components'
import ScrollAnimation from 'react-animate-on-scroll'
import { styleConstants as sc } from '../config'
import 'animate.css/animate.min.css'
import '../App.css'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      selected: 0
    }
    this.pages = [
      'home',
      'howItWorks',
      'propertyReports',
      'matchboxAnalysts',
      'aboutUs'
    ]
    this.pageRefs = []
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e) => {
    const newPage = this.calcCurrentPage(e.srcElement.scrollingElement.scrollTop, this.pageRefs, this.props.height)
    if (newPage !== this.state.newPage) {
      this.setState({
        selected: newPage
      })
    }
  }

  calcCurrentPage = (scrollOffset, pageRefs, windowHeight) => {
    for (var i = 0; i < pageRefs.length - 1; i++) {
      if (scrollOffset < pageRefs[i + 1].offsetTop) {
        const topPageVisibleHeight = pageRefs[i + 1].offsetTop - scrollOffset
        const bottomPageVisibleHeight = windowHeight - topPageVisibleHeight
        if (topPageVisibleHeight < bottomPageVisibleHeight) {
          return i + 1
        } else return i
      }
    }
    return pageRefs.length - 1
  }

  scrollToRef = (ref) => window.scrollTo(0, ref.offsetTop - 100)

  handleViewPageSection = (ref, pageNum) => {
    // this.setState({ selected: pageNum })
    this.scrollToRef(ref)
  }

  renderBackgroundCircles = () => {
    return (
      <Grid container alignItems='center' justify='center' style={{ position: 'absolute', right: 0, width: '60%', height: '110%' }}>
        <Grid class='backgroundCircle6' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle7' style={{ position: 'absolute' }} />

        {/* <Grid class='backgroundCircle' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle1' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle2' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle3' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle4' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle5' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle6' style={{ position: 'absolute' }} />
        <Grid class='backgroundCircle7' style={{ position: 'absolute' }} />
    <Grid class='backgroundCircle8' style={{ position: 'absolute' }} /> */}
        <img src={building1} style={{ position: 'absolute', right: 120, width: '40%' }} />
        <img src={plant2} style={{ position: 'absolute', left: 50, width: '30%' }} />
        {/* <img src={greenBackgroundShape1} style={{ position: 'absolute', bottom: 150, width: '77%' }} /> */}
      </Grid>
    )
  }

  renderPhone= (phoneImage) => {
    return (
      <Grid class='slide-container' style={{ width: '70%' }}>
        <img class='appear' src={phoneImage} style={{ marginTop: 20 }} />
      </Grid>
    )
  }

  renderHowItWorks = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        <div style={{ marginBottom: 40 }}>
          <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
          How it works:
          </Typography>
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            image={testPic1}
            num={1}
            heading='Download the app'
            paragraph1='Matchbox is completely free to download and is available on both Android and IOS stores.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={2}
            image={testPic2}
            heading='Set your filters'
            paragraph1='Set your filters on your profile screen so that you only see properties you ares interested in.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={3}
            image={testPic1}
            heading='Start swiping'
            paragraph1='Swipe through your filtered list of properties and match with the ones you like.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0 }}>
          <Step
            num={4}
            image={testPic1}
            heading='It’s a match!'
            paragraph1='Matching with a property lets you chat to the agent/owner responsible for the property.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0 }}>
          <Step
            num={5}
            image={testPic1}
            heading='Request a property report'
            paragraph1='For every property that you match with, you’ll have the option of requesting a detailed property report for that specific listing. You get access to everything you need to know about the property, without stepping foot in it. '
          />
        </div>
      </TextContainer>
    )
  }

  renderPropertyReports = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        <div style={{ marginBottom: 40 }}>
          <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
          Detailed property report:
          </Typography>
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={1}
            image={testPic1}
            heading='It’s personal'
            paragraph1='For every report we create, one of our analysts personally visited the property and screened it for over 50 specific data points.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={2}
            image={testPic2}
            heading='It’s useable'
            paragraph1='We’ve made our reports easy to use and understand, with expert UX and UI design - so you don’t need to be a property expert to understand any of it.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={3}
            image={testPic1}
            heading='It’s all-inclusive'
            paragraph1='Our reports include details as small as the number of plug points per room and as large as the future market prediction for the price of that property.'
          />
        </div>
      </TextContainer>
    )
  }

  renderMatchboxAnalysts = () => {
    return (
      <TextContainer>
        <Grid style={{ maxWidth: 400 }}>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <HighlightLine />
          </div>
          <div style={{ marginBottom: 40 }}>
            <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Matchbox Analysts
            </Typography>
          </div>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Traditionally valuations and price predictions have been elementary and rely a lot on gut feel, rather than actual data. We train machine learning algorithms to produce valuations based on a large number of specific inputs and calculate ROI for different investment opportunities, including AirBnB and buy-to-let. The combination of extensive market data and AI analysis ensures that users have everything they need to make the correct decision.
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          We send objective Matchbox Analysts to view and verify properties. They check and analyse the property, gathering over 50 data points of information. We use standardized check-lists to ensure that the information we gather remains completely objective.
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Interested in becoming a Matchbox Analyst? Simply send us an email to start the process: info@matchbox.app
          </Typography>
        </Grid>

      </TextContainer>
    )
  }

  renderAboutUs = () => {
    return (
      <TextContainer>
        <Grid style={{ maxWidth: 400 }}>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <HighlightLine />
          </div>
          <div style={{ marginBottom: 40 }}>
            <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Our story
            </Typography>
          </div>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          The problem with buying or selling property is that there is a mismatch of information in the market.  Sellers and estate agents tend to be the custodians of information. Buyers then have to rely on the information they choose to divulge, or spend a disproportionate amount of time to find the relevant information for themselves.
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          The solution is making data available to buyers in order to correct this asymmetry of information in the market. Easily swipe through the exact properties you’re looking for. Don’t waste time going to viewings when you’re unsure about the property, request a property report and make an informed decision. Buying property is always an investment and you should have all the tools you need to make sure it's a good one.
          </Typography>
          <div style={{ marginBottom: 20 }}>
            <Typography variant='h6' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Contact us:
            </Typography>
          </div>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Want to know more? Have some feedback for us? We’d love to hear from you!
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Send an email our way - info@matchbox.app
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          One of us loves doing admin, we promise we’ll reply!
          </Typography>
        </Grid>

      </TextContainer>
    )
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        {sc.WIDTH_BREAKPOINT < this.props.width && this.renderBackgroundCircles()}
        <div style={{ position: 'static', width: this.props.width, height: 20 }} />
        <TopBar selected={this.state.selected} position='fixed' width={this.props.width} pageRefs={this.pageRefs} handleViewPageSection={(ref, pageNum) => this.handleViewPageSection(ref, pageNum)} />
        {sc.WIDTH_BREAKPOINT2 < this.props.width &&
          <div style={{ position: 'fixed', right: 30, top: '30%' }}>
            <PageIndicatorDots selected={this.state.selected} pageRefs={this.pageRefs} pages={this.pages} handleViewPageSection={(ref, pageNum) => this.handleViewPageSection(ref, pageNum)} />
          </div>}
        <div ref={(ref) => { this.pageRefs[0] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.props.width}>
              <TextSection width={this.props.width} />
            </ContentContainer>
            <ContentContainer primary={false} width={this.props.width}>
              {/* this.renderPhone(phoneOutline2) */}
              <SlideShow />
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT2 > this.props.width &&
            <PageSection>
              <img src={building1} style={{ position: 'absolute', marginTop: 200, right: 0, width: '60%' }} />
              <img src={plant2} style={{ position: 'absolute', marginTop: 200, left: 0, width: '40%' }} />
              <ContentContainer primary width={this.props.width}>
                <SlideShow />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[1] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.props.width}>
              {this.renderHowItWorks()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.props.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person1} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.props.width &&
            <PageSection>
              <ContentContainer primary width={this.props.width}>
                <img class='appear' src={person1} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[2] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.props.width}>
              {this.renderPropertyReports()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.props.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person2} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.props.width &&
            <PageSection>
              <ContentContainer primary width={this.props.width}>
                <img class='appear' src={person2} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[3] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.props.width}>
              {this.renderMatchboxAnalysts()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.props.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person3} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.props.width &&
            <PageSection>
              <ContentContainer primary width={this.props.width}>
                <img class='appear' src={person3} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[4] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.props.width}>
              {this.renderAboutUs()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.props.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person2} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.props.width &&
            <PageSection>
              <ContentContainer primary width={this.props.width}>
                <img class='appear' src={person1} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

        <Footer width={this.props.width} />

        {/* <div style={{ position: 'fixed', top: '75%', width: '100%', height: '25%', backgroundColor: 'white' }} /> */}
        {/*
        <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'left top 0', position: 'fixed', top: '540px', left: '50px', width: '25%', height: '5%', color: sc.BODY_TEXT_COLOR }}>
          <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>Hold your breath.</Typography>
          <Typography variant='caption' style={{ color: sc.DARK_COLOR, fontWeight: 'bold' }}> Coming soon</Typography>
          <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}> to IOS and Android</Typography>
        </div>
        */}
      </div>
    )
  }
}

export default Home
