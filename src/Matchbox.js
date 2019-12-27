import React, { PureComponent } from 'react'
import Home from './pages/Home'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'
import PostListings from './pages/PostListings'
import GraphPlotter from './pages/GraphPlotter'
import Feed from './pages/Feed'
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

function Page (props) {
  const { id, id2 } = useParams()
  console.log('its me your looking foooor', id, id2)
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
      {id === 'feed' && <Feed />}
      {id === 'admin' && <Admin />}
      {id === 'view_property' && <ViewProperty id={id2} />}
    </div>
  )
}

function HomePage (props) {
  const { id } = useParams()
  return (
    <div>
      <TopNavigationBar value={id} position='static' onChange={id => changePath(props, id)} />
      <TopNavigationBar value={id} position='fixed' />
      <Home />
    </div>
  )
}

class Matchbox extends PureComponent {
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
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/:id' exact render={() => <Page />} />
          <Route path='/:id/:id2' render={() => <Page />} />
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
