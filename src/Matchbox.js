import React, { PureComponent } from 'react'
import Home from './pages/Home'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'
import PostListings from './pages/PostListings'
import GraphPlotter from './pages/GraphPlotter'
import Feed from './pages/Feed'
import Pricing from './pages/Pricing'
import ContactUs from './pages/ContactUs'
import Industry from './pages/Industry'
import HowToSpotAGreatInvestment from './pages/blogs/HowToSpotAGreatInvestment'
import SecretToPropertyInvestment from './pages/blogs/SecretToPropertyInvestment'
import ForeignInvestors from './pages/blogs/ForeignInvestors'
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom'
import './App.css'
import { TopNavigationBar, TopFiller } from './components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from './redux/actions/AuthActions'
import * as UserActions from './redux/actions/UserActions'

import fire from './config/Firebase'
import Admin from './pages/Admin'

const TopBar = (props) => {
  return (
    <>
      <TopNavigationBar
        authActions={props.authActions}
        userActions={props.UserActions}
        userDetails={props.userDetails}
        auth={props.auth}
        position='fixed'
      />
      <TopFiller />
    </>
  )
}

const Page = (props) => {
  const { id, id2 } = useParams()
  return (
    <div>
      <TopBar {...props} />
      {id === 'terms-of-use' && <TermsOfUse />}
      {id === 'privacy-policy' && <PrivacyPolicy />}
      {id === 'post-listing' && <PostListings />}
      {id === 'graph-plotter' && <GraphPlotter />}
      {id === 'feed' && <Feed feedState='card_focused' id={id2} width={props.width} height={props.height} />}
      {id === 'admin' && <Admin />}
      {id === 'industry' && <Industry width={props.width} height={props.height} />}
      {id === 'how-to-spot-a-great-investment' && <HowToSpotAGreatInvestment width={props.width} height={props.height} />}
      {id === 'foreigner-investing-in-south-africa-5-things-you-should-know' && <ForeignInvestors width={props.width} height={props.height} />}
      {id === 'the-secret-to-property-invesment-the-18-year-property-cycle' && <SecretToPropertyInvestment width={props.width} height={props.height} />}
      {id === 'pricing' && <Pricing width={props.width} height={props.height} />}
      {id === 'contact-us' && <ContactUs width={props.width} height={props.height} />}
    </div>
  )
}

const HomePage = (props) => {
  return (
    <div>
      <TopBar {...props} />
      <Home width={props.width} height={props.height} />
    </div>
  )
}

class Matchbox extends PureComponent {
  constructor () {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  authListener () {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!user.isAnonymous) {
          this.props.actions.userActions.loadUserDetails()
        }
        const userDataLocal = {
          first_name: 'anon',
          last_name: 'user',
          premium_user: false
        }
        this.props.actions.userActions.setUserDetails(userDataLocal)
        this.props.actions.authActions.loadAppData(this.props.user.new_anon)
      } else {
        this.props.actions.authActions.createAnonymousUser()
        // this.setState({ user: null })
        // localStorage.removeItem('user')
      }
    })
  }

  componentWillMount () {
    this.authListener()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/' exact render={() =>
              <HomePage
                authActions={this.props.actions.authActions}
                userActions={this.props.actions.userActions}
                userDetails={this.props.user.details}
                auth={this.props.auth}
                width={this.state.width}
                height={this.state.height}
              />}
          />
          <Route
            path='/:id' exact render={() =>
              <Page
                authActions={this.props.actions.authActions}
                userActions={this.props.actions.userActions}
                userDetails={this.props.user.details}
                auth={this.props.auth}
                width={this.state.width}
                height={this.state.height}
              />}
          />
          <Route
            path='/:id/:id2' render={() =>
              <Page
                authActions={this.props.actions.authActions}
                userActions={this.props.actions.userActions}
                userDetails={this.props.user.details}
                auth={this.props.auth}
                width={this.state.width}
                height={this.state.height}
              />}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.get('user'),
  auth: state.get('auth')
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    authActions: bindActionCreators(AuthActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matchbox)
