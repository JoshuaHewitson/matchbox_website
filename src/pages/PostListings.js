import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
// import windowSize from 'react-window-size'
// import Zoom from '@material-ui/core/Zoom'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {
  Footer,
  ContentContainer,
  HighlightLine,
  TextContainer,
  PageSection,
  Login
} from '../components'
import TextField from '@material-ui/core/TextField'
import { styleConstants as sc } from '../config'
import fire from '../config/Firebase'
import '../App.css'

class PostListings extends Component {
  constructor () {
    super()
    this.state = ({
      user: null,
      error: false,
      errorText: 'there is an error',
      width: window.innerWidth,
      height: window.innerHeight,
      // listing main data
      first_name: '',
      last_name: '',
      cell_number: '',
      email: '',
      agency: 'none',
      extra_filters: {
        furnished: false,
        garden: false,
        pets_allowed: false,
        swimming_pool: false
      },
      images: [''],
      num_bedrooms: '',
      num_bathrooms: '',
      price: '',
      property_type: '',
      suburb: '',
      scraped_from: '',
      description: '',
      // extra public info
      parking_spaces: '',
      square_meters: ''

    })
    this.authListener = this.authListener.bind(this)
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
        {/* <label for='agencyInput'>{label}</label>
        <input value={this.state[name]} onChange={e => this.handleChange(e)} name={name} class='form-control' id={inputId} placeholder={placeholder} />
    */}
      </div>
    )
  }

  renderImageInput = (label, index, inputId, placeholder, extraProps) => {
    return (
      <div>
        <TextField
          {...extraProps}
          style={{ minWidth: 400 }}
          id={inputId}
          label={label}
          placeholder={placeholder}
          value={this.state.images[index].src}
          onChange={(event) => this.handleImageInputChange(index, event)}
          margin='normal'
        />
        {/* <label for='agencyInput'>{label}</label>
        <input value={this.state[name]} onChange={e => this.handleChange(e)} name={name} class='form-control' id={inputId} placeholder={placeholder} />
    */}
      </div>
    )
  }

  renderImagesInputs = (images) => {
    return images.map((src, index) => {
      return this.renderImageInput('Image ' + (index + 1) + ' src', index, (index + 1) + 'Input', 'Enter image src')
    })
  }

  renderCheckBoxes = () => {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.extra_filters.furnished}
              onChange={(event) => this.handleCheckboxChange('furnished', event)}
              value={this.state.extra_filters.furnished}
              color={sc.PRIMARY_COLOR}
            />
          }
          label='Furnished'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.extra_filters.garden}
              onChange={(event) => this.handleCheckboxChange('garden', event)}
              value={this.state.extra_filters.garden}
              color={sc.PRIMARY_COLOR}
            />
          }
          label='Garden'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.extra_filters.pets_allowed}
              onChange={(event) => this.handleCheckboxChange('pets_allowed', event)}
              value={this.state.extra_filters.pets_allowed}
              color={sc.PRIMARY_COLOR}
            />
          }
          label='Pets allowed'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.extra_filters.swimming_pool}
              onChange={(event) => this.handleCheckboxChange('swimming_pool', event)}
              value={this.state.extra_filters.swimming_pool}
              color={sc.PRIMARY_COLOR}
            />
          }
          label='Swimming pool'
        />
      </FormGroup>
    )
  }

  handleAddImageSrc = () => {
    var images = this.state.images
    images.push('')
    this.setState({ images: images })
  }

  renderPostListing = () => {
    return (
      <TextContainer>
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <HighlightLine />
        </div>
        {this.renderHeading('post a listing :)')}
        {this.renderInput('First name', 'first_name', 'firstNameInput', 'Enter first name')}
        {this.renderInput('Last name', 'last_name', 'lastNameInput', 'Enter last name')}
        {this.renderInput('FB Profile URL', 'fb_profile_url', 'fbProfileUrlInput', 'Enter facebook profile url')}
        {this.renderInput('Cell number', 'cell_number', 'cellNumberInput', 'Enter cell number')}
        {this.renderInput('Email', 'email', 'emailInput', 'Enter email', { type: 'email' })}
        {this.renderInput('Agency - none if not agent', 'agency', 'agencyInput', 'Enter agency')}
        {this.renderInput('Num Bedrooms', 'num_bedrooms', 'numBedrooms', 'Enter num bedrooms')}
        {this.renderInput('Num Bathrooms', 'num_bathrooms', 'numBathrooms', 'Enter num bathrooms')}
        {this.renderInput('Price', 'price', 'priceInput', 'Enter price')}
        {this.renderInput('Property type', 'property_type', 'propertyTypeInput', 'Enter property type')}
        {this.renderInput('Suburb', 'suburb', 'suburbInput', 'Enter suburb')}
        {this.renderInput('Scraped from', 'scraped_from', 'scrapedFromInput', 'Enter scraped from')}
        {this.renderInput('Description', 'description', 'descriptionInput', 'Enter description', { multiline: true })}
        <div style={{ height: 20 }} />
        {this.renderCheckBoxes()}
        <div style={{ height: 20 }} />
        <Typography variant='heading6'>Images: </Typography>
        {this.renderImagesInputs(this.state.images)}
        <Button onClick={() => this.handleAddImageSrc()}>add image src</Button>
        <button type='submit' onClick={e => this.handleSubmit(e, this.state)} class='btn btn-primary'>Submit</button>
        {this.state.error && this.renderError(this.state.errorText)}
        {this.state.success && this.renderSuccess(this.state.success)}
      </TextContainer>
    )
  }

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.value })
  }

  handleCheckboxChange = (name, event) => {
    var filters = this.state.extra_filters
    filters[name] = event.target.checked
    this.setState({ extra_filters: filters })
  }

  handleImageInputChange = (index, event) => {
    var images = this.state.images
    images[index] = { src: event.target.value }
    this.setState({ images: images })
  }

  checkAgency = (value) => {
    return value.length > 0
  }

  checkFirstName = (value) => {
    return value.length > 0
  }

  checkLastName = (value) => {
    return value.length > 0
  }

  checkFBProfileUrl = (value) => {
    return value.length > 0
  }

  checkNumRooms = (value) => {
    var check = /^[0-9 ]+$/
    return value > 0 && check.test(value)
  }

  checkPrice = (value) => {
    var check = /^[0-9 ]+$/
    return value > 0 && check.test(value)
  }

  checkPropertyType = (value) => {
    return value === 'house' || value === 'apaptment' || value === 'room_in_shared_residence'
  }

  checkSuburb = (value) => {
    return value.length > 0
  }

  checkScrapedFrom = (value) => {
    return value.length > 0
  }

  checkDescription = (value) => {
    return value.length > 0
  }

  handleSubmit = (e, state) => {
    // console.log(e)
    e.preventDefault()
    const {
      agency,
      first_name,
      last_name,
      fb_profile_url,
      extra_filters,
      images,
      num_bedrooms,
      num_bathrooms,
      price,
      property_type,
      suburb,
      scraped_from,
      description
    } = state
    if (!this.checkAgency(agency)) {
      this.setState({ error: true, errorText: 'please add agency' })
      return
    }
    if (!this.checkFirstName(first_name)) {
      this.setState({ error: true, errorText: 'please add first name' })
      return
    }
    if (!this.checkLastName(last_name)) {
      this.setState({ error: true, errorText: 'please add last name' })
      return
    }
    if (!this.checkFBProfileUrl(fb_profile_url)) {
      this.setState({ error: true, errorText: 'please add fb profile url' })
      return
    }
    if (!this.checkNumRooms(num_bedrooms)) {
      this.setState({ error: true, errorText: 'please fix bedrooms/bathrooms' })
      return
    }
    if (!this.checkNumRooms(num_bathrooms)) {
      this.setState({ error: true, errorText: 'please fix bedrooms/bathrooms' })
      return
    }
    if (!this.checkPrice(price)) {
      this.setState({ error: true, errorText: 'please fix price' })
      return
    }
    if (!this.checkPropertyType(property_type)) {
      this.setState({ error: true, errorText: 'please fix property type options: house, apartment, or room_in_shared_residence' })
      return
    }
    if (!this.checkSuburb(suburb)) {
      this.setState({ error: true, errorText: 'please fix suburb options: ...(not sure yet)' })
      return
    }
    if (!this.checkScrapedFrom(scraped_from)) {
      this.setState({ error: true, errorText: 'please fix scraped from' })
      return
    }
    if (!this.checkDescription(description)) {
      this.setState({ error: true, errorText: 'please fix description' })
      return
    }
    const listing = {
      agency,
      extra_filters,
      images,
      num_bedrooms: parseInt(num_bedrooms, 10),
      num_bathrooms: parseInt(num_bathrooms, 10),
      price: parseInt(price, 10),
      property_type,
      suburb,
      scraped_from,
      description
    }
    this.setState({ success: true, error: false })
    console.log(listing)

    const firebaseDB = fire.firestore()
    const listingDocRef = firebaseDB.collection('sale_listings').doc()
    const metaData = {
      email: this.state.email,
      fb_profile_url: this.state.fb_profile_url,
      cell_number: this.state.cell_number,
      id: listingDocRef.id,
      num_views: 0,
      num_matches: 0,
      name: this.state.first_name + '_' + this.state.last_name,
      owner: 'FB_USER_' + this.state.first_name + '_' + this.state.last_name,
      users: ['FB_USER_' + this.state.first_name + '_' + this.state.last_name],
      price: parseInt(price, 10),
      public: true,
      thumbnail_src: this.state.images[0],
      property_type: this.state.property_type,
      suburb: this.state.suburb
    }
    listingDocRef.set(listing)
      .then((u) => {
        listingDocRef.collection('rental_listing_info').doc('meta').set(metaData)
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div>
          <PageSection>
            <ContentContainer primary width={this.state.width}>
              <div>
                {this.state.user ? this.renderPostListing() : (<Login />)}
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
