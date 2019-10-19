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
      selected: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.pages = [
      'home',
      'buying',
      'selling',
      'agents',
      'aboutUs',
      'contact'
    ]
    this.pageRefs = []
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  handleScroll = (e) => {
    const newPage = this.calcCurrentPage(e.srcElement.scrollingElement.scrollTop, this.pageRefs, this.state.height)
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

  renderBuyingSteps = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        <div style={{ marginBottom: 40 }}>
          <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Looking for properties? 
          </Typography>
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            image={testPic1}
            num={1}
            heading='Download and Sign Up'
            paragraph1='Matchbox is free to download and use. You can sign in with your email, Facebook or Google account.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={2}
            image={testPic2}
            heading='Set your filters'
            paragraph1='Set up your search filters. Effortlessly switch between buying and renting with specific filters suited to your needs. Filters are always saved and can be changed anytime.'
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
            paragraph1='Matching with a property opens a chat with the landlord/agent responsible for the property. You can instant message, schedule viewing times and even send out an offer letter with our easy-to-use template - all in-app.'
          />
        </div>
      </TextContainer>
    )
  }

  renderSellingSteps = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        <div style={{ marginBottom: 40 }}>
          <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
           Don’t have time to go to a viewing? Don’t want to attend a viewing alone?
          </Typography>
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={1}
            image={testPic1}
            heading='Download and Sign Up'
            paragraph1='Matchbox is free to download and use. You can sign in with your email, Facebook or Google account.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={2}
            image={testPic2}
            heading='Select “Request a Buddy”'
            paragraph1='Specify when/where you want them to attend a viewing'
            paragraph2='Choose whether you want your Matchbox Buddy to go view the property for you, or whether you want them to accompany you to a viewing.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={3}
            image={testPic1}
            heading='Only pay once a viewing has been accepted!'
          />
        </div>
      </TextContainer>
    )
  }

  renderAgentSteps = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        <div style={{ marginBottom: 40 }}>
          <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Want to verify your property/chat to buyers?
          </Typography>
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={1}
            image={testPic1}
            heading='Request verification'
            paragraph1='We send a Matchbox Buddy to your property to verify that your listing is an accurate representation of the property.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={2}
            image={testPic2}
            heading='Start chatting'
            paragraph1='We notify you once someone has matched with your property and a chat opens which allows you to talk to them directly.'
          />
        </div>
        <div style={{ marginLeft: 0, marginRight: 0, marginBottom: 40 }}>
          <Step
            num={3}
            image={testPic1}
            heading=' Five times lucky'
            paragraph1='Your first five matches are free! If you want to chat with more people, simply select one of our monthly payment packages '
          />
        </div>
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
          The problem with buying or selling property isn’t the sale in itself. The problem is viewing those properties. Viewing properties online can be frustrating, with clumsy filters and inaccurate photos. Going to viewings is a hassle, either because you don’t have time to go yourself, or you don’t want to go on your own.
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          The solution is an easy-to-use app that makes viewing properties safe and effortless. Easily swipe through the exact properties you’re looking for. Don’t waste time going to viewings when you’re unsure about the property, let someone go on your behalf. And don’t feel like you need to worry about your safety (or your judgment) when going to viewings, just bring a Matchbox Buddy with you.
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          We believe that viewing properties should be easy, safe and enjoyable. Finding a new home should be an exciting experience - and so Matchbox was born. An easy and reliable way to view properties, in your pocket.
          </Typography>
<div style={{ marginBottom: 20, marginTop: 20 }}>
            <HighlightLine />
          </div>
          <div style={{ marginBottom: 40 }}>
            <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Contact us
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

  renderBuddySteps = () => {
    return (
      <TextContainer>
        <Grid style={{ maxWidth: 400 }}>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <HighlightLine />
          </div>
          <div style={{ marginBottom: 40 }}>
            <Typography variant='h5' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Matchbox buddies
            </Typography>
          </div>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          We send objective Matchbox Buddies to view and verify properties, so you never have to worry about property pictures being out of date, incorrect locations or straight-out fake listings.
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Matchbox Buddies are able to add approval stamps to properties for things like safety, noise level, location and more! Look out for these stamps on selected properties.
          </Typography>
          <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Matchbox Buddies have all been briefed on safety issues and are knowledgeable about general property viewing tips - in order to give you the best viewing experience.
          </Typography>
        </Grid>
      </TextContainer>
    )
  }

  /* scroll animation
  <ScrollAnimation
                duration={1}
                animateIn='fadeIn'
                // animateOut='fadeOut'
                initiallyVisible={false}
              >
                {this.renderBuyingSteps()}
              </ScrollAnimation>
  */

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        {sc.WIDTH_BREAKPOINT < this.state.width && this.renderBackgroundCircles()}
        <TopBar selected={this.state.selected} position='static' width={this.state.width} pageRefs={this.pageRefs} handleViewPageSection={(ref, pageNum) => this.handleViewPageSection(ref, pageNum)} />
        <TopBar selected={this.state.selected} position='fixed' width={this.state.width} pageRefs={this.pageRefs} handleViewPageSection={(ref, pageNum) => this.handleViewPageSection(ref, pageNum)} />
        {sc.WIDTH_BREAKPOINT2 < this.state.width &&
          <div style={{ position: 'fixed', right: 30, top: '30%' }}>
            <PageIndicatorDots selected={this.state.selected} pageRefs={this.pageRefs} pages={this.pages} handleViewPageSection={(ref, pageNum) => this.handleViewPageSection(ref, pageNum)} />
          </div>}
        <div ref={(ref) => { this.pageRefs[0] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              <TextSection width={this.state.width} />
            </ContentContainer>
            <ContentContainer primary={false} width={this.state.width}>
              {/* this.renderPhone(phoneOutline2) */}
              <SlideShow />
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT2 > this.state.width &&
            <PageSection>
              <img src={building1} style={{ position: 'absolute', marginTop: 200, right: 0, width: '60%' }} />
              <img src={plant2} style={{ position: 'absolute', marginTop: 200, left: 0, width: '40%' }} />
              <ContentContainer primary width={this.state.width}>
                <SlideShow />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[1] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              {this.renderBuyingSteps()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.state.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person1} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.state.width &&
            <PageSection>
              <ContentContainer primary width={this.state.width}>
                <img class='appear' src={person1} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[2] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              {this.renderSellingSteps()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.state.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person2} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.state.width &&
            <PageSection>
              <ContentContainer primary width={this.state.width}>
                <img class='appear' src={person2} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[3] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              {this.renderAgentSteps()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.state.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person3} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.state.width &&
            <PageSection>
              <ContentContainer primary width={this.state.width}>
                <img class='appear' src={person3} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

<div ref={(ref) => { this.pageRefs[4] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              {this.renderBuddySteps()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.state.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person1} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.state.width &&
            <PageSection>
              <ContentContainer primary width={this.state.width}>
                <img class='appear' src={person1} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>

        <div ref={(ref) => { this.pageRefs[5] = ref }}>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              {this.renderAboutUs()}
            </ContentContainer>
            <ContentContainer primary={false} width={this.state.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person2} style={{ marginTop: 20 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
          {sc.WIDTH_BREAKPOINT > this.state.width &&
            <PageSection>
              <ContentContainer primary width={this.state.width}>
                <img class='appear' src={person2} style={{ width: '60%', marginTop: 20 }} />
              </ContentContainer>
            </PageSection>}
        </div>


        <Footer width={this.state.width} />

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
