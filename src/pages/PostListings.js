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
      type: 'prop24',
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
      url: '',
      agency: 'none',
      extra_filters: {
        furnished: false,
        wifi_included: false,
        off_street_parking: false,
        electricity_included: false
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
      square_meters: '',
      floor_size: '',
      scraped_data: ''
    })
    this.authListener = this.authListener.bind(this)
    this.propertyTypes = ['house', 'apartment', 'room_in_shared_residence']
    this.suburbs = ['stellenbosch_central', 'die_boord', 'welgevonden', 'la_colline', 'onder_papegaaiberg', 'universiteitsoord']
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

  removeImageSrc = (index) => {
    const images = this.state.images
    var newImages = []
    for (var i = 0; i < images.length; i++) {
      if (i !== index) {
        newImages.push(images[i])
      }
    }
    this.setState({
      images: newImages
    })
  }

  renderImageInput = (label, index, inputId, placeholder, extraProps) => {
    return (
      <Grid container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
        <IconButton aria-label='search' style={{ width: 50, height: 50 }} onClick={() => this.removeImageSrc(index)}>
          x
        </IconButton>
      </Grid>
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
              checked={this.state.extra_filters.wifi_included}
              onChange={(event) => this.handleCheckboxChange('wifi_included', event)}
              value={this.state.extra_filters.wifi_included}
              color={sc.PRIMARY_COLOR}
            />
          }
          label='Wifi included'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.extra_filters.off_street_parking}
              onChange={(event) => this.handleCheckboxChange('off_street_parking', event)}
              value={this.state.extra_filters.off_street_parking}
              color={sc.PRIMARY_COLOR}
            />
          }
          label='Off-street parking'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.extra_filters.electricity_included}
              onChange={(event) => this.handleCheckboxChange('electricity_included', event)}
              value={this.state.extra_filters.electricity_included}
              color={sc.PRIMARY_COLOR}
            />
          }
          label='Electricity included'
        />
      </FormGroup>
    )
  }

  handleAddImageSrc = () => {
    var images = this.state.images
    images.push('')
    this.setState({ images: images })
  }

  changePostingType = (type) => {
    this.setState({
      type,
      error: false,
      errorText: 'there is an error',
      first_name: '',
      last_name: '',
      cell_number: '',
      email: '',
      url: '',
      agency: 'none',
      extra_filters: {
        furnished: false,
        wifi_included: false,
        off_street_parking: false,
        electricity_included: false
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
      square_meters: '',
      scraped_data: ''
    })
  }

  renderPostListing = () => {
    return this.state.type === 'manual'
      ? (
        <TextContainer>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <HighlightLine />
          </div>
          {this.renderHeading('post a listing :)')}
          {this.renderInput('First name', 'first_name', 'firstNameInput', 'Enter first name')}
          {this.renderInput('Last name', 'last_name', 'lastNameInput', 'Enter last name')}
          {this.renderInput('FB Profile URL', 'url', 'fbProfileUrlInput', 'Enter facebook profile url')}
          {this.renderInput('Cell number', 'cell_number', 'cellNumberInput', 'Enter cell number')}
          {this.renderInput('Email', 'email', 'emailInput', 'Enter email', { type: 'email' })}
          {this.renderInput('Agency - none if not agent', 'agency', 'agencyInput', 'Enter agency')}
          {this.renderInput('Num Bedrooms', 'num_bedrooms', 'numBedrooms', 'Enter num bedrooms')}
          {this.renderInput('Num Bathrooms', 'num_bathrooms', 'numBathrooms', 'Enter num bathrooms')}
          {this.renderInput('Price', 'price', 'priceInput', 'Enter price')}
          {this.renderSelect('Property type', 'property_type', this.propertyTypes, 'propertyTypeSelect', 'Select property type')}
          <div style={{ height: 10 }} />
          {this.renderSelect('Suburb', 'suburb', this.suburbs, 'suburbSelect', 'Select suburb')}
          {this.renderInput('Scraped from', 'scraped_from', 'scrapedFromInput', 'Enter scraped from')}
          {this.renderInput('Description', 'description', 'descriptionInput', 'Enter description', { multiline: true })}
          <div style={{ height: 20 }} />
          {this.renderCheckBoxes()}
          <div style={{ height: 20 }} />
          <Typography variant='heading6'>Images: </Typography>
          {this.renderImagesInputs(this.state.images)}
          <Button onClick={() => this.handleAddImageSrc()}>add image src</Button>
          <div style={{ height: 20 }} />
          <button type='submit' onClick={e => this.handleSubmitManual(e, this.state)} class='btn btn-primary'>Submit</button>
          {this.state.error && this.renderError(this.state.errorText)}
          {this.state.success && this.renderSuccess(this.state.success)}
          <div style={{ height: 50 }} />
          <Button onClick={() => this.changePostingType('prop24')}>Change posting method</Button>
        </TextContainer>
      )
      : (
        <TextContainer>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <HighlightLine />
          </div>
          {this.renderHeading('post listing - prop 24 JSON :)')}
          {this.renderInput('Scraped data', 'scraped_data', 'scrapedDataInput', 'Paste scraped data', { multiline: true })}
          {this.renderSelect('Property type', 'property_type', this.propertyTypes, 'propertyTypeSelect', 'Select property type')}
          <div style={{ height: 10 }} />
          {this.renderSelect('Suburb', 'suburb', this.suburbs, 'suburbSelect', 'Select suburb')}
          {this.renderInput('Agency - none if not agent', 'agency', 'agencyInput', 'Enter agency')}
          {this.renderInput('Prop 24 URL', 'url', 'prop24UrlInput', 'Enter prop24 url')}
          <div style={{ height: 20 }} />
          {this.renderCheckBoxes()}
          <div style={{ height: 20 }} />
          <button type='submit' onClick={e => this.handleSubmitProp24(e)} class='btn btn-primary'>Submit</button>
          {this.state.error && this.renderError(this.state.errorText)}
          {this.state.success && this.renderSuccess(this.state.success)}
          <div style={{ height: 50 }} />
          <Button onClick={() => this.changePostingType('manual')}>Change posting method</Button>
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

  checkUrl = (value) => {
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
    return value === 'house' || value === 'apartment' || value === 'room_in_shared_residence'
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

  checkForErrors = (state) => {
    if (!this.checkAgency(state.agency)) {
      this.setState({ error: true, errorText: 'please add agency' })
      return true
    }
    if (!this.checkFirstName(state.first_name)) {
      this.setState({ error: true, errorText: 'please add first name' })
      return true
    }
    if (!this.checkLastName(state.last_name)) {
      this.setState({ error: true, errorText: 'please add last name' })
      return true
    }
    if (!this.checkUrl(state.url)) {
      this.setState({ error: true, errorText: 'please add url' })
      return true
    }
    if (!this.checkNumRooms(state.num_bedrooms)) {
      this.setState({ error: true, errorText: 'please fix bedrooms/bathrooms' })
      return true
    }
    if (!this.checkNumRooms(state.num_bathrooms)) {
      this.setState({ error: true, errorText: 'please fix bedrooms/bathrooms' })
      return true
    }
    if (!this.checkPrice(state.price)) {
      this.setState({ error: true, errorText: 'please fix price' })
      return true
    }
    if (!this.checkPropertyType(state.property_type)) {
      this.setState({ error: true, errorText: 'please fix property type options: house, apartment, or room_in_shared_residence' })
      return true
    }
    if (!this.checkSuburb(state.suburb)) {
      this.setState({ error: true, errorText: 'please fix suburb options: ...(not sure yet)' })
      return true
    }
    if (!this.checkScrapedFrom(state.scraped_from)) {
      this.setState({ error: true, errorText: 'please fix scraped from' })
      return true
    }
    if (!this.checkDescription(state.description)) {
      this.setState({ error: true, errorText: 'please fix description' })
      return true
    }
    return false
  }

  handleSubmitProp24 = (e) => {
    e.preventDefault()
    const listingData = JSON.parse(this.state.scraped_data)
    // console.log(listingData)
    var agentNames = listingData.agentName.replace(/\b([a-z])/g, x => { return x.toLowerCase() }).split(' ')
    if (listingData.agentName === '') agentNames = ['no', 'name']
    const firstName = agentNames[0]
    const lastName = agentNames[agentNames.length - 1]
    console.log(firstName, lastName)
    console.log(this.state.first_name)
    this.setState({
      first_name: firstName,
      last_name: lastName,
      email: listingData.agentEmail,
      cell_number: listingData.agentNumbers[0],
      floor_size: listingData.floorSize,
      thumbnail_src: listingData.images[0].src + '/Crop320x213',
      images: listingData.images,
      num_bedrooms: parseInt(listingData.bedrooms, 10),
      num_bathrooms: parseInt(listingData.bathrooms, 10),
      price: parseInt(listingData.price, 10),
      scraped_from: 'prop24',
      description: listingData.description
    }, () => this.handleSubmit())
  }

  handleSubmitManual = (e, state) => {
    e.preventDefault()
    this.setState({
      thumbnail_src: state.images[0].src
    })
    this.handleSubmit()
  }

  handleSubmit = () => {
    console.log(this.state.first_name, this.state.last_name)
    if (this.checkForErrors(this.state)) return
    const listing = {
      agency: this.state.agency,
      extra_filters: this.state.extra_filters,
      images: this.state.images,
      num_bedrooms: parseInt(this.state.num_bedrooms, 10),
      num_bathrooms: parseInt(this.state.num_bathrooms, 10),
      price: parseInt(this.state.price, 10),
      property_type: this.state.property_type,
      suburb: this.state.suburb,
      scraped_from: this.state.scraped_from,
      description: this.state.description.replace(/(\r\n|\n|\r)/gm, '**') // newline symbol for db \n doesn't work becuse it is converted, then ignored (I think)
    }
    if (this.state.floor_size !== '') listing.floor_size = this.state.floor_size
    this.setState({ success: true, error: false })
    // console.log(listing)

    const firebaseDB = fire.firestore()
    const listingDocRef = firebaseDB.collection('rental_listings').doc()
    const metaData = {
      email: this.state.email,
      cell_number: this.state.cell_number,
      id: listingDocRef.id,
      url: this.state.url,
      num_views: 0,
      num_matches: 0,
      name: this.state.first_name + '_' + this.state.last_name,
      price: parseInt(this.state.price, 10),
      public: true,
      thumbnail_src: this.state.thumbnail_src,
      property_type: this.state.property_type,
      suburb: this.state.suburb
    }
    if (this.state.type === 'manual') {
      metaData.owner = 'FB_USER_' + this.state.first_name + '_' + this.state.last_name
      metaData.users = ['FB_USER_' + this.state.first_name + '_' + this.state.last_name]
    } else {
      metaData.owner = 'PROP24_USER_' + this.state.first_name + '_' + this.state.last_name
      metaData.users = ['PROP24_USER_' + this.state.first_name + '_' + this.state.last_name]
    }
    listingDocRef.set(listing)
      .then((u) => {
        listingDocRef.collection('rental_listing_info').doc('meta').set(metaData)
      }).catch((error) => {
        console.log(error)
      })
    console.log(listing)
    console.log(metaData)
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
