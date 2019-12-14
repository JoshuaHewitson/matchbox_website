import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
// import windowSize from 'react-window-size'
// import Zoom from '@material-ui/core/Zoom'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import {
  Footer,
  ScatterPlot,
  ContentContainer,
  HighlightLine,
  TextContainer,
  PageSection,
  Login
} from '../components'
import TextField from '@material-ui/core/TextField'
import { styleConstants as sc } from '../config'
import fire from '../config/Firebase'
import firebase from 'firebase'
import '../App.css'

const COLLECTION_NAME = 'sale_listings' // 'rental_listings'
const settings = {
  width: 500,
  height: 300,
  padding: 30,
  numDataPoints: 100
  // maxRange: () => Math.random() * 1000
}

class PostListings extends Component {
  constructor () {
    super()
    this.state = ({
      user: null,
      width: window.innerWidth,
      height: window.innerHeight,
      suburb: '',
      x: '',
      y: '',
      data: [[0, 1], [40, 24]]
    })
    this.authListener = this.authListener.bind(this)
    this.suburbs = ['green_point', 'sea_point', 'bantry_bay', 'mouille_point', 'foreshore', 'fresnaye', 'clifton', 'de_waterkant']
    this.variables = ['price', 'floor_size', 'num_bedrooms', 'num_bathrooms']
  }

  componentDidMount () {
    this.authListener()
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

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.value })
  }

  handleCheckboxChange = (name, event) => {
    var filters = this.state.extra_filters
    filters[name] = event.target.checked
    this.setState({ extra_filters: filters })
  }

  handlePlot = (suburb, x, y) => {
    this.getData(suburb, x, y)
  }

  getData = (suburb, varX, varY) => {
    const dataSet = []
    const firebaseDB = fire.firestore()
    const listingDocRef = firebaseDB.collection(COLLECTION_NAME).where('suburb', '==', suburb)
    listingDocRef.get()
      .then((response) => {
        response.forEach(doc => {
          const x = doc.data()[varX]
          const y = doc.data()[varY]
          if (x !== undefined && y !== undefined) dataSet.push([parseInt(x), parseInt(y)])
        })
        var newData = this.state.data
        newData = dataSet
        console.log(dataSet)
        this.setState({ data: newData })
      }).catch((error) => {
        console.log(error)
      })
  }

  renderLogin = () => {
    return (
      <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
        hello this is login
      </Typography>
    )
  }

  renderHeading = (text) => {
    return (
      <Typography paragraph variant='subtitle2' style={{ color: sc.DARK_COLOR }}>
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

  renderInput = (label, name, inputId, placeholder, extraProps) => {
    return (
      <div>
        <TextField
          {...extraProps}
          style={{ minWidth: 400 }}
          id={inputId}
          label={label}
          placeholder={placeholder}
          value={this.state[name]}
          onChange={(event) => this.handleChange(name, event)}
          margin='normal'
        />
      </div>
    )
  }

  renderSelect = (label, name, values, selectId, extraProps) => {
    return (
      <FormControl style={{ minWidth: 400 }}>
        <InputLabel id={selectId + 'label'}>{label}</InputLabel>
        <Select
          {...extraProps}
          labelId={selectId + 'label'}
          id='selectId'
          value={this.state[name]}
          onChange={(event) => this.handleChange(name, event)}
        >
          {values.map(value => {
            return <MenuItem key={value} value={value}>{value}</MenuItem>
          })}
        </Select>
      </FormControl>
    )
  }

  renderGraphPlotter = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        {this.renderHeading('Graphy graph :)')}
        {this.renderSelect('Suburb', 'suburb', this.suburbs, 'suburbSelect', 'Select suburb')}
        <div style={{ height: 10 }} />
        {this.renderSelect('x var', 'x', this.variables, 'xVarSelect', 'Select x variable')}
        <div style={{ height: 10 }} />
        {this.renderSelect('y var', 'y', this.variables, 'yVarSelect', 'Select y variable')}
        <div style={{ height: 50 }} />
        <Button onClick={() => this.handlePlot(this.state.suburb, this.state.x, this.state.y)}>Plot</Button>
        <ScatterPlot data={this.state.data} {...settings} />
      </TextContainer>
    )
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              <div>
                {this.state.user ? this.renderGraphPlotter() : (<Login />)}
              </div>
            </ContentContainer>
          </PageSection>
        </div>

        <Footer width={this.state.width} />

      </div>
    )
  }
}

export default PostListings
