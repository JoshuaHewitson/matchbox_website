import React, { PureComponent } from 'react'
import Home from './pages/Home'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'
import PostListings from './pages/PostListings'
import GraphPlotter from './pages/GraphPlotter'
import Feed from './pages/Feed'
import Pricing from './pages/Pricing'
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom'
import './App.css'
import ViewProperty from './pages/ViewProperty'
import { TopNavigationBar } from './components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from './redux/actions/AuthActions'

import fire from './config/Firebase'
import Admin from './pages/Admin'

const changePath = (props, path) => {
  window.scrollTo(0, 0)
  props.history.push(path)
}

const Page = (props) => {
  const { id, id2 } = useParams()
  return (
    <div>
      {/*
      <TopNavigationBar value={id} position='static' onChange={id => changePath(props, id)} />
      <TopNavigationBar value={id} position='fixed' />
        */}
      {id === 'terms_of_use' && <TermsOfUse />}
      {id === 'privacy_policy' && <PrivacyPolicy />}
      {id === 'post_listing' && <PostListings />}
      {id === 'graph_plotter' && <GraphPlotter />}
      {id === 'feed' && <Feed feedState='search_results' width={props.width} height={props.height} />}
      {id === 'admin' && <Admin />}
      {id === 'pricing' && <Pricing width={props.width} height={props.height} />}
      {id === 'view_property' && <Feed feedState='card_focused' id={id2} width={props.width} height={props.height} />}
    </div>
  )
}

const HomePage = (props) => {
  const { id } = useParams()
  return (
    <div>
      <TopNavigationBar value={id} position='static' onChange={id => changePath(props, id)} />
      <TopNavigationBar value={id} position='fixed' />
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
        this.props.actions.authActions.loadAppData(false)
      } else {
        console.log('anon login')
        this.props.actions.auth.createAnonymousUser()
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
          <Route path='/' exact render={() => <HomePage width={this.state.width} height={this.state.height} />} />
          <Route path='/:id' exact render={() => <Page width={this.state.width} height={this.state.height} />} />
          <Route path='/:id/:id2' render={() => <Page width={this.state.width} height={this.state.height} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    authActions: bindActionCreators(AuthActions, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matchbox)
