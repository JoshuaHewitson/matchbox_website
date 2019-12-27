import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {
  Footer,
  ScatterPlot,
  ContentContainer,
  HighlightLine,
  TextContainer,
  PageSection,
  Login,
  ImageViewer,
  PropertyInfo,
  TopBar
} from '../components'

import TextField from '@material-ui/core/TextField'
import { styleConstants as sc } from '../config'
import fire from '../config/Firebase'
import RadioGroup from '@material-ui/core/RadioGroup'
// import { useParams } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import '../App.css'

const COLLECTION_NAME = 'sale_listings' // 'rental_listings'
const graphSettings = {
  width: 400,
  height: 400,
  padding: 30,
  numDataPoints: 100
  // maxRange: () => Math.random() * 1000
}

const formatSuburb = (string = 'not set') => {
  return string.replace(/_/g, ' ').replace(/\b([a-z])/g, x => { return x.toUpperCase() })
}

class ViewProperty extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      user: null,
      width: window.innerWidth,
      height: window.innerHeight,
      x: '',
      y: '',
      listing: { images: [{ src: '' }] },
      data: [],
      scatterPlotData: [],
      resultsCount: 0
    })
  }

  componentDidMount () {
    // this.authListener()
    // console.log(this.props.match.params.id)
  }

  componentWillMount () {
    this.getData(this.props.id)
  }

  authListener () {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.setState({ user })
        // localStorage.setItem('user', user.uid)
      } else {
        this.setState({ user: null })
        // localStorage.removeItem('user')
      }
    })
  }

  componentWillUnmount = () => {
    // window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  getData = (id) => {
    const firebaseDB = fire.firestore()
    const listingDocRef = firebaseDB.collection(COLLECTION_NAME).doc(id)
    listingDocRef.get()
      .then((response) => {
        const item = response.data()
        console.log(item)
        window.scrollTo(0, 0)
        this.setState({ listing: item })
      }).catch((error) => {
        console.log(error)
      })
  }

  renderLogin = () => {
    return (
      <ContentContainer primary width={this.state.width}>
        <div style={{ margin: 50 }}>
          <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
            hello this is login
          </Typography>
        </div>
      </ContentContainer>
    )
  }

  renderHeading = (text) => {
    return (
      <Typography paragraph variant='h4' style={{ color: sc.DARK_COLOR }}>
        {text}
      </Typography>
    )
  }

  renderError = (errorText) => {
    return (
      <Typography variant='caption' style={{ color: 'red' }}>{errorText}</Typography>
    )
  }

  renderSuccess = () => {
    return (
      <Typography variant='caption' style={{ color: sc.PRIMARY_COLOR }}>success</Typography>
    )
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <Grid
          container
          // justify='center'
          // alignitems='center'
          style={{ width: '100%', height: '100%', backgroundColor: sc.LIGHT_GREY }}
        >
          <Grid
            container
            justify='center'
            style={{
              width: '100%',
              // maxWidth: 800,
              minHeight: 400,
              backgroundColor: sc.DARK_COLOR
            // maxWidth: 950,
            // marginBottom: 100
            // minHeight: 600
            // borderLeft: 'solid #dddddd 0.5px'
            }}
          >
            <Grid style={{ width: '100%', maxWidth: 900 }}>
              <ImageViewer images={this.state.listing.images} />
            </Grid>
            {/* this.renderFilters() */}
            {/* this.renderFeedCards() */}
          </Grid>
          <Grid
            container
            justify='center'
            style={{
              width: '100%',
              // maxWidth: 800,
              minHeight: 400,
              backgroundColor: sc.LIGHT_GREY,
              // maxWidth: 950,
              marginBottom: 100
            // minHeight: 600
            // borderLeft: 'solid #dddddd 0.5px'
            }}
          >
            <Grid style={{ width: '100%', maxWidth: 900, backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}>
              <PropertyInfo full {...this.state.listing} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(ViewProperty)
