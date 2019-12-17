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
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import {
  Footer,
  ScatterPlot,
  ContentContainer,
  HighlightLine,
  TextContainer,
  PageSection,
  Login,
  FeedList,
  FeedCard,
  ImageViewer,
  PropertyInfo,
  TopBar
} from '../components'

import TextField from '@material-ui/core/TextField'
import { styleConstants as sc } from '../config'
import fire from '../config/Firebase'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import '../App.css'

const COLLECTION_NAME = 'sale_listings' // 'rental_listings'
const graphSettings = {
  width: 400,
  height: 400,
  padding: 30,
  numDataPoints: 100
  // maxRange: () => Math.random() * 1000
}
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const formatSuburb = (string = 'not set') => {
  return string.replace(/_/g, ' ').replace(/\b([a-z])/g, x => { return x.toUpperCase() })
}

const StyledCheckBox = withStyles({
  root: {
    color: sc.BODY_TEXT_COLOR,
    '&$checked': {
      color: sc.PRIMARY_COLOR
    }
  },
  checked: {}
})(props => <Checkbox color='default' {...props} />)

const StyledChip = withStyles({
  root: {
    // color: 'white',
    backgroundColor: sc.LIGHT_GREY,
    margin: 2
  }
})(Chip)

const StyledMenuItem = withStyles({
  root: {
    '&:focus': {
      backgroundColor: sc.LIGHT_GREY
    },
    '&:hover,&$active': {
      backgroundColor: sc.LIGHT_GREY
    },
    '& .Mui-selected': {
      backgroundColor: sc.LIGHT_GREY
    }
  },
  active: {}
})(props => <MenuItem color='default' {...props} />)

const MultipleSelect = withStyles({
  root: {
    '&:focus': {
      backgroundColor: 'white'
    }
  }
})(Select)

const StyledInput = withStyles({
  root: {
    '&:focus': {
      borderColor: 'white'
    }
  },
  input: {
    '&:focus': {
      borderBottomColor: 'red'
      // backgroundColor: 'red'
    }
  }
})(Input)

const AirbnbSlider = withStyles({
  root: {
    color: sc.PRIMARY_COLOR,
    height: 3,
    padding: '15px 0'
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow
      }
    },
    '& .bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  track: {
    height: 3
  },
  valueLabel: {
    left: 'calc(-50% + 11px)',
    // top: -22
    '& *': {
      // background: sc.PRIMARY_COLOR_SHADOW,
      // color: '#000'
    }
  },
  rail: {
    color: sc.LIGHT_GREY,
    opacity: 1,
    height: 3
  }
})(props => <Slider valueLabelDisplay='on' {...props} />)

function AirbnbThumbComponent (props) {
  return (
    <span {...props}>
      {props.children}
      <span className='bar' />
      <span className='bar' />
      <span className='bar' />
    </span>
  )
}

function valuetext (value) {
  // let priceOut
  // console.log(priceIn)
  if (value >= 10000000) {
    return Math.round(value / 1000000) + 'M'
  } else if (value >= 1000000) {
    return (Math.round(value * 2 / 1000000) / 2) + 'M'
  } else if (value >= 50000) {
    return Math.round(value / 10000) * 10 + 'K'
  } else if (value >= 5000) {
    return Math.round(value / 1000) + 'K'
  } else {
    return (Math.round(value / 100) / 10).toFixed(1) + 'K'
  }
}

function ValueLabelComponent (props) {
  const { children, open, value } = props

  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
}

class Feed extends Component {
  constructor () {
    super()
    this.state = ({
      user: null,
      width: window.innerWidth,
      height: window.innerHeight,
      suburb: 'bantry_bay',
      suburbs: ['bantry_bay'],
      priceRange: [0, 20],
      x: '',
      y: '',
      data: [],
      scatterPlotData: [],
      resultsCount: 0
    })
    this.authListener = this.authListener.bind(this)
    this.suburbs = ['green_point', 'sea_point', 'bantry_bay', 'mouille_point', 'foreshore', 'fresnaye', 'clifton', 'de_waterkant']
    this.variables = ['price', 'floor_size', 'num_bedrooms', 'num_bathrooms']
  }

  componentDidMount () {
    this.authListener()
  }

  componentWillMount () {
    this.getData(this.state.suburb)
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

  handleUpdatePriceRange = (event, newValue, name) => {
    const resultsCount = this.countResults(newValue).count
    const scatterPlotData = this.countResults(newValue).scatterPlotData
    this.setState({ [name]: newValue, resultsCount: resultsCount, scatterPlotData: scatterPlotData })
  }

  countResults = (newValue) => {
    const scatterPlotData = []
    var count = 0
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.filterItems(this.state.data[i], newValue)) {
        const x = this.state.data[i].price
        const y = this.state.data[i].floor_size
        scatterPlotData.push([parseInt(x), parseInt(y)])
        count++
      }
    }
    return { count, scatterPlotData }
  }

  filterItems = (item, price) => {
    if (item.price >= price[0] && item.price <= price[1]) return true
    return false
  }

  handleChangeMultiple = (name, event) => {
    const { options } = event.target
    const value = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    this.setState({ [name]: value })
  }

  handleCheckboxChange = (name, event) => {
    var filters = this.state.extra_filters
    filters[name] = event.target.checked
    this.setState({ extra_filters: filters })
  }

  getData = (suburb) => {
    const data = []
    const scatterPlotData = []
    const varX = 'price'
    const varY = 'floor_size'
    const firebaseDB = fire.firestore()
    const listingDocRef = firebaseDB.collection(COLLECTION_NAME).where('suburb', '==', suburb)
    listingDocRef.get()
      .then((response) => {
        response.forEach(doc => {
          data.push(doc.data())
          const x = doc.data()[varX]
          const y = doc.data()[varY]
          if (x !== undefined && y !== undefined) scatterPlotData.push([parseInt(x), parseInt(y)])
        })
        var newData = data
        var newScatterPlotData = scatterPlotData
        this.setState({ data: newData, scatterPlotData: newScatterPlotData })
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
            return <MenuItem key={value} value={value}>{formatSuburb(value)}</MenuItem>
          })}
        </Select>
      </FormControl>
    )
  }

  renderSelectMultiple = (label, name, values, selectId, extraProps) => {
    return (
      <FormControl style={{ minWidth: 400 }}>
        <InputLabel id={selectId + 'label'}>{label}</InputLabel>
        <MultipleSelect
          {...extraProps}
          labelId={selectId + 'label'}
          id='selectId'
          multiple
          value={this.state[name]}
          onChange={(event) => this.handleChange(name, event)}
          input={<StyledInput />}
          // renderValue={selected => selected.join(', ')}
          renderValue={selected => (
            <div>
              {selected.map(value => (
                <StyledChip key={value} label={formatSuburb(value)} />
              ))}
            </div>
          )}
        >
          {values.map(value => {
            return (
              <StyledMenuItem key={value} value={value}>
                <StyledCheckBox checked={this.state[name].indexOf(value) > -1} />
                <ListItemText primary={formatSuburb(value)} />
              </StyledMenuItem>)
          })}
        </MultipleSelect>
      </FormControl>
    )
  }

  renderFilters = () => {
    return (
      <Grid
        // container
        // justify='center'
        // alignItems='center'
        style={{
          flex: 1
          // backgroundColor: 'red'
          // border: 'solid #dddddd 0.5px'
        }}
      >
        <Grid style={{ position: 'relative', flex: 1 }}>
          <Grid style={{ position: 'fixed', flex: 1, backgroundColor: 'white', borderRadius: 10, marginLeft: 10, marginTop: 10, paddingRight: 30 }}>
            <TextContainer>
              <div style={{ marginBottom: 20, marginTop: 20 }}>
                <HighlightLine />
              </div>
              {this.renderHeading(this.state.resultsCount + ' results')}
              {this.renderSelect('Suburb', 'suburb', this.suburbs, 'suburbSelect', 'Select suburb')}
              {/* this.renderInput('Price', 'price', 'priceInput', 'Enter price') */}
              <div style={{ height: 70 }} />
              <AirbnbSlider
                ThumbComponent={AirbnbThumbComponent}
                onChangeCommitted={(event, newValue) => this.handleUpdatePriceRange(event, newValue, 'priceRange')}
                // value={this.state.priceRange}
                // aria-labelledby='price-slider'
                // getAriaValueText={valuetext}
                valueLabelFormat={valuetext}
                valueLabelDisplay='on'
                max={100000000}
                min={1000000}
                // getAriaLabel={index => (index === 0 ? 'Minimum price' : 'Maximum price')}
                defaultValue={[20000000, 40000000]}
              />
              {/* this.renderInput('Num Bedrooms', 'num_bedrooms', 'numBedrooms', 'Enter num bedrooms') */}
              {/* this.renderInput('Num Bathrooms', 'num_bathrooms', 'numBathrooms', 'Enter num bathrooms') */}
              <div style={{ height: 10 }} />
              <Button onClick={() => this.getData(this.state.suburb)}>Search</Button>
              <ScatterPlot data={this.state.scatterPlotData} filterItems={(item) => this.filterItems(item, this.state.priceRange)} {...graphSettings} />
            </TextContainer>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderCard = (item) => {
    if (this.filterItems(item, this.state.priceRange)) {
      return (
        <FeedCard item={item}>
          <ImageViewer images={item.images} />
          <PropertyInfo {...item}>
            <Button style={{ color: 'white', marginTop: 10, marginRight: 10, backgroundColor: sc.LIGHT_GREY }} onClick={() => this.getData(this.state.suburb)}>match</Button>
            <Button style={{ color: 'white', borderRadius: 20, paddingLeft: 20, paddingRight: 20, marginTop: 10, backgroundColor: sc.PRIMARY_COLOR }} onClick={() => this.getData(this.state.suburb)}>Request Report</Button>
          </PropertyInfo>
        </FeedCard>
      )
    }
    return null
  }

  renderFeedCards = () => {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{
          flex: 2
          // border: 'solid #dddddd 0.5px'
        }}
      >
        <FeedList data={this.state.data} renderItem={(item) => this.renderCard(item)} />
      </Grid>
    )
  }

  renderFeed = () => {
    return (
      <Grid
        container
        // justify='center'
        // alignitems='center'
        style={{ width: '100%', height: '100%', backgroundColor: sc.LIGHT_GREY }}
      >
        <Grid
          container
          style={{
            width: '100%',
            height: '100%',
            // maxWidth: 950,
            marginBottom: 100
            // minHeight: 600
            // borderLeft: 'solid #dddddd 0.5px'
          }}
        >

          {this.renderFilters()}
          {this.renderFeedCards()}
        </Grid>
      </Grid>
    )
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <TopBar selected={this.state.selected} position='static' width={this.state.width} pageRefs={this.pageRefs} handleViewPageSection={(ref, pageNum) => this.handleViewPageSection(ref, pageNum)} />
        <TopBar selected={this.state.selected} position='fixed' width={this.state.width} pageRefs={this.pageRefs} handleViewPageSection={(ref, pageNum) => this.handleViewPageSection(ref, pageNum)} />
        <div>
          {this.state.user ? this.renderFeed() : (<Login />)}
        </div>
        <Footer width={this.state.width} />

      </div>
    )
  }
}

export default Feed
