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
  TopNavigationBar,
  PriceSlider
} from '../components'

import TextField from '@material-ui/core/TextField'
import { styleConstants as sc } from '../config'
import fire from '../config/Firebase'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withRouter } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LinearProgress from '@material-ui/core/LinearProgress'
import '../App.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FiltersActions from '../redux/actions/FiltersActions'
import * as FeedActions from '../redux/actions/FeedActions'

const COLLECTION_NAME = 'sale_listings' // 'rental_listings'
const graphSettings = {
  width: 400,
  height: 340,
  padding: 25,
  numDataPoints: 100
  // maxRange: () => Math.random() * 1000
}
const iOSBoxShadow =
'0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(15, 48, 44,0.2),0 0 0 1px rgba(47,137,128,0.05)'

const formatSuburb = (string = 'not set') => {
  return string.replace(/_/g, ' ').replace(/\b([a-z])/g, x => { return x.toUpperCase() })
}

const StyledCheckBox = withStyles({
  root: {
    color: sc.SECONDARY_COLOR_DARK_2,
    '&$checked': {
      color: sc.PRIMARY_COLOR
    }
  },
  checked: {}
})(props => <Checkbox color='default' {...props} />)

const StyledCheckBox2 = withStyles({
  root: {
    color: sc.PRIMARY_COLOR,
    '&$checked': {
      color: sc.SECONDARY_COLOR_DARK_2
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

const StyledRadio = withStyles({
  root: {
    color: sc.PRIMARY_COLOR,
    '&$checked': {
      color: sc.SECONDARY_COLOR_DARK_2
    }
  },
  checked: {}
})(props => <Radio color='default' {...props} />)

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
})(props => <Select {...props} />)

const StyledSelect = withStyles({
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
    color: sc.SECONDARY_COLOR_DARK_2,
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
    height: 3,
    color: sc.PRIMARY_COLOR
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

const StyledTabs = withStyles({
  root: {
    with: '100%'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 70,
      // height: 1,
      width: '100%',
      backgroundColor: sc.PRIMARY_COLOR
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />)

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: sc.SECONDARY_COLOR_DARK_2,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: 0,
    '&:focus': {
      opacity: 1
    }
  }
}))(props => <Tab disableRipple {...props} />)

const StyledLinearProgress = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: sc.PRIMARY_COLOR_OPACITY
  },
  barColorPrimary: {
    backgroundColor: sc.PRIMARY_COLOR
  }
}))(props => <LinearProgress {...props} />)

const GreyLinearProgress = withStyles(theme => ({
  root: {
    marginBottom: 30
  },
  colorPrimary: {
    backgroundColor: sc.LIGHT_GREY
  },
  barColorPrimary: {
    backgroundColor: sc.PLACE_HOLDER_TEXT_COLOR
  }
}))(props => <LinearProgress {...props} />)

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Grid
      component='div'
      role='tabpanel'
      hidden={value !== index}
      {...other}
    >
      {children}
    </Grid>
  )
}

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      user: null,
      width: window.innerWidth,
      height: window.innerHeight,
      filterTabIndex: 0,
      suburb: 'bantry_bay',
      suburbs: ['bantry_bay'],
      priceRange: [20000000, 40000000],
      bedrooms: ['any'],
      bathrooms: ['any'],
      x: '',
      y: '',
      data: [],
      scatterPlotData: [],
      resultsCount: 0
    })
    // this.suburbs = ['green_point', 'sea_point', 'bantry_bay', 'mouille_point', 'foreshore', 'fresnaye', 'clifton', 'de_waterkant']
    this.variables = ['price', 'floor_size', 'num_bedrooms', 'num_bathrooms']
    this.blocks = ['the_docklands', 'dockside', 'dockdockdock', 'etc']
    this.numRoomsOptions = ['any', '1', '2', '3', '4', '5', '6+']
    this.cardRefs = {}
  }

  componentDidMount () {
    // this.authListener()
  }

  componentWillMount () {
    // this.getData(this.getSuburb())
  }

  componentWillUnmount = () => {
    // window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  getSuburb = () => {
    return Object.keys(this.props.filters.suburbs)[0]
  }

  getBedrooms = () => {
    return this.props.filters.bedrooms
  }

  getBathrooms = () => {
    return this.props.filters.bathrooms
  }

  scrollToRef = (ref) => window.scrollTo(0, ref.offsetTop - 73)

  handleChangePath = (path) => {
    window.scrollTo(0, 0)
    this.props.history.push(path)
  }

  handleChange = (name, event) => {
    // console.log(event)
    this.setState({ [name]: event.target.value })
  }

  handleChangeTabs = (name, event, newValue) => {
    this.setState({ [name]: newValue })
  }

  handleChangeRooms = (name, event) => {
    var value = event.target.value
    const index = value.indexOf('any')
    // console.log(value, index)
    if (index > -1) {
      if (this.props.filters[name].indexOf('any') > -1) value.splice(index, index + 1)
      else value = ['any']
    }
    if (name === 'bedrooms') {
      this.props.actions.filters.setBedrooms(value)
      this.props.actions.feed.filterFeedData(this.props.filters.priceRange, value, this.props.filters.bathrooms)
    } else {
      this.props.actions.filters.setBathrooms(value)
      this.props.actions.feed.filterFeedData(this.props.filters.priceRange, this.props.filters.bedrooms, value)
    }
  }

  handleChangeSuburb = (name, event) => {
    // const { count, scatterPlotData } = this.countResults(this.state.priceRange)
    // this.setState({ [name]: event.target.value })
    this.props.actions.filters.setSuburb(event.target.value)
    this.props.actions.feed.loadFeed(event.target.value)
    window.scrollTo(0, 0)
  }

  handleChangeBlock = (key, event) => {
    this.props.actions.feed.setBlock(key, event.target.value)
  }

  handleUpdatePriceRange = (event, newValue, name) => {
    this.props.actions.feed.filterFeedData(newValue, this.props.filters.bedrooms, this.props.filters.bathrooms)
    this.props.actions.filters.setPriceRange(newValue)
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

  renderSelectBlock = (label, item, values, selectId, extraProps) => {
    return (
      <FormControl style={{ minWidth: 300 }}>
        <InputLabel id={selectId + 'label'}>{label}</InputLabel>
        <StyledSelect
          {...extraProps}
          labelId={selectId + 'label'}
          id='selectId'
          value={this.props.feed.data.get(item.key).block}
          onChange={(event) => this.handleChangeBlock(item.key, event)}
        >
          {values.map(value => {
            return <MenuItem key={value} value={value}>{value}</MenuItem>
          })}
        </StyledSelect>
      </FormControl>
    )
  }

  renderSelectSuburb = (label, name, values, selectId, extraProps) => {
    return (
      <FormControl style={{ minWidth: 400 }}>
        <InputLabel id={selectId + 'label'}>{label}</InputLabel>
        <StyledSelect
          {...extraProps}
          labelId={selectId + 'label'}
          id='selectId'
          value={this.props.filters.suburb}
          onChange={(event) => this.handleChangeSuburb(name, event)}
        >
          {values.map(value => {
            return <MenuItem key={value} value={value}>{formatSuburb(value)}</MenuItem>
          })}
        </StyledSelect>
      </FormControl>
    )
  }

  renderSelectMultiple = (label, name, values, selectId, extraProps) => {
    return (
      <FormControl style={{ width: '100%' }}>
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

  renderSelectMultipleRooms = (label, name, values, selectId, extraProps) => {
    return (
      <FormControl style={{ width: '100%' }}>
        <InputLabel id={selectId + 'label'}>{label}</InputLabel>
        <MultipleSelect
          {...extraProps}
          labelId={selectId + 'label'}
          id='selectId'
          multiple
          value={this.props.filters[name]}
          onChange={(event) => this.handleChangeRooms(name, event)}
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
                <StyledCheckBox checked={this.props.filters[name].indexOf(value) > -1} />
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
          <Grid style={{ boxShadow: iOSBoxShadow, position: 'fixed', flex: 1, backgroundColor: 'white', borderRadius: 10, marginLeft: 10, marginTop: 10, paddingRight: 30 }}>
            <TextContainer>
              {(this.props.filters.loading || this.props.feed.loading) && <StyledLinearProgress variant='query' />}
              <StyledTabs value={this.state.filterTabIndex} onChange={(event, value) => this.handleChangeTabs('filterTabIndex', event, value)} aria-label='styled tabs example'>
                <StyledTab label='Search results' />
                <StyledTab label='Shortlist' />
              </StyledTabs>
              <TabPanel value={this.state.filterTabIndex} index={0}>
                <Grid container flexDirection='row'>
                  <Grid style={{ flex: 1 }}>
                    {/*
                  <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <HighlightLine />
                  </div>
                  */}
                    <div style={{ height: 30 }} />
                    {this.renderHeading(this.props.feed.count + ' results')}
                  </Grid>
                  {/*
                <Grid container justify='flex-end' style={{ flex: 1, marginTop: 30 }}>
                  <FormControl component='fieldset'>
                    <RadioGroup aria-label='gender' name='gender1'>
                      <FormControlLabel value='all' control={<StyledRadio />} label='All results' />
                      <FormControlLabel value='shortlist' control={<StyledRadio />} label='Shortlist' />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                */}
                </Grid>
                {(this.props.filters.loading)
                  ? <GreyLinearProgress variant='query' />
                  : this.renderSelectSuburb('Suburb', 'suburb', this.props.filters.suburbs, 'suburbSelect', 'Select suburb')}
                {/* this.renderInput('Price', 'price', 'priceInput', 'Enter price') */}
                <div style={{ height: 70 }} />
                {
                  (this.props.filters.loading)
                    ? <GreyLinearProgress variant='query' />
                    : <PriceSlider
                      onChangeCommitted={(event, newValue) => this.handleUpdatePriceRange(event, newValue, 'priceRange')}
                      defaultValue={this.props.filters.priceRange}
                    />
                }
                <div style={{ height: 10 }} />
                <Grid container flexDirection='row'>
                  <Grid style={{ flex: 1, marginRight: 10 }}>
                    {this.renderSelectMultipleRooms('Bedrooms', 'bedrooms', this.numRoomsOptions, 'bedroomsSelect', { variant: 'outlined' })}
                  </Grid>
                  <Grid style={{ flex: 1 }}>
                    {this.renderSelectMultipleRooms('Bathrooms', 'bathrooms', this.numRoomsOptions, 'bathroomsSelect', 'Select number of bathrooms')}
                  </Grid>
                </Grid>
                {/* this.renderInput('Num Bedrooms', 'num_bedrooms', 'numBedrooms', 'Enter num bedrooms') */}
                {/* this.renderInput('Num Bathrooms', 'num_bathrooms', 'numBathrooms', 'Enter num bathrooms') */}
                <div style={{ height: 10 }} />
                {/* <Button onClick={() => this.getData(this.state.suburb)}>Search</Button> */}
                <ScatterPlot
                  data={this.props.feed.filtered_data}
                  xVal='price' yVal='floor_size'
                  xLabel='Price in rands'
                  yLabel='Floor size m²'
                  handleDotClick={(key) => this.scrollToRef(this.cardRefs[key])}
                  {...graphSettings}
                />
              </TabPanel>
              <TabPanel value={this.state.filterTabIndex} index={1}>
                Item Two
              </TabPanel>
            </TextContainer>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderCard = (item) => {
    return (
      <FeedCard item={item} key={item.key} addRef={(ref, key) => { this.cardRefs[key] = ref }}>
        <ImageViewer numBedrooms={item.num_bedrooms} numBathrooms={item.num_bathrooms} floorSize={item.floor_size} images={item.images} />
        <PropertyInfo onClick={() => this.props.history.push('/view_property/' + item.key)} {...item}>
          <Grid container flexDirection='row' alignItems='center'>
            <FormGroup style={{ marginTop: 10, marginRight: 10 }}>
              {this.renderSelectBlock('Block', item, this.props.filters.blocks[this.props.filters.suburb], 'blockSelect', 'Select block')}
            </FormGroup>
          </Grid>
        </PropertyInfo>
      </FeedCard>
    )
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
        <FeedList data={this.props.feed.filtered_data} renderItem={(item) => this.renderCard(item)} />
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
        <TopNavigationBar value='admin' position='static' onChange={id => this.handleChangePath(id)} />
        <TopNavigationBar value='admin' position='fixed' />
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
    console.log(this.props.filters.suburb)
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div>
          {this.renderFeed()}
        </div>
        <Footer width={this.state.width} />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.get('filters'),
  feed: state.get('feed')
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    filters: bindActionCreators(FiltersActions, dispatch),
    feed: bindActionCreators(FeedActions, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Admin))
