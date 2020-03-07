import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import {
  SidePanel,
  Filters,
  Footer,
  FeedList,
  FeedCard,
  CardExpanded,
  ImageViewer,
  PropertyInfo,
  ViewDetails,
  RequestReport
} from '../components'

import { styleConstants as sc } from '../config'
import { withRouter } from 'react-router-dom'
import '../App.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FiltersActions from '../redux/actions/FiltersActions'
import * as FeedActions from '../redux/actions/FeedActions'
import * as ListingDetailsActions from '../redux/actions/ListingDetailsActions'
import * as AuthActions from '../redux/actions/AuthActions'
import * as PaymentActions from '../redux/actions/PaymentActions'

const FeedCards = (props) => {
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ flex: 2 }}
    >
      <FeedList
        data={props.data} renderItem={(item) =>
          <props.Card
            item={item}
            key={item.key}
            selected={props.selected}
            expanded={props.expanded}
            cardRefs={props.cardRefs}
            onClick={props.handleCardClick}
            handleViewDetails={(value, key) => props.handleViewDetails(value, key)}
            handleRequestReport={(value, key) => props.handleRequestReport(value, key)}
          />}
      />
    </Grid>
  )
}

const Card = (props) => {
  return (
    <FeedCard selected={props.selected} expanded={props.expanded} item={props.item} key={props.item.key} addRef={(ref, key) => { props.cardRefs[key] = ref }}>
      <ImageViewer numBedrooms={props.item.num_bedrooms} numBathrooms={props.item.num_bathrooms} floorSize={props.item.floor_size} images={props.item.images} />
      <PropertyInfo onClick={() => props.onClick(props.item.key)} {...props.item}>
        <Grid container flexDirection='row' alignItems='center'>
          {/*
          <FormGroup style={{ marginTop: 10, marginRight: 10 }}>
            <FormControlLabel
              control={
                <StyledCheckBox
                  // checked={item.shortlisted}
                  // onChange={(event) => { item.shortlisted = true }}
                  // value={item.shortlisted}
                  color={sc.PRIMARY_COLOR}
                />
              }
              label='Shortlist'
            />
          </FormGroup>
            */}
          <Button
            textTransform='none'
            style={{
              color: 'white',
              borderRadius: 2,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 10,
              marginRight: 20,
              backgroundColor: sc.SECONDARY_COLOR_DARK_2
            }}
            onClick={() => props.handleViewDetails(true, props.item.key)}
          >View Details
          </Button>
          {/*
          <Button
            style={{
              color: 'white',
              borderRadius: 2,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 10,
              marginRight: 10,
              backgroundColor: sc.PRIMARY_COLOR,
              boxShadow: `0 3px 5px 2px ${sc.PRIMARY_COLOR_OPACITY}`
            }}
            onClick={() => props.handleRequestReport(true, props.item.key)}
          >Request Report
          </Button>
          */}
        </Grid>
      </PropertyInfo>
    </FeedCard>
  )
}

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      filterTabIndex: 0,
      cardFocusedTabIndex: 0,
      suburb: 'bantry_bay',
      suburbs: ['bantry_bay'],
      priceRange: [20000000, 40000000],
      bedrooms: ['any'],
      bathrooms: ['any'],
      x: '',
      y: '',
      data: [],
      scatterPlotData: [],
      resultsCount: 0,
      viewDetails: false,
      requestReport: false
    })
    this.variables = ['price', 'floor_size', 'num_bedrooms', 'num_bathrooms']
    this.numRoomsOptions = ['any', '1', '2', '3', '4', '5', '6+']
    this.cardRefs = {}
  }

  componentDidMount () {
    // if (this.props.id) this.props.actions.feed.setFeedSelectedCard(this.props.id)
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

  handleChangeTabs = (name, value) => {
    this.setState({ [name]: value })
  }

  handleChangeCardFocusedTab = (value, item) => {
    this.setState({ cardFocusedTabIndex: value })
    console.log(item)
    this.props.actions.feed.filterFeedData(this.props.filters.priceRange, [item.num_bedrooms], [item.num_bathrooms])
  }

  handleChangeRooms = (name, value) => {
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

  handleChangeSuburb = (suburb) => {
    this.props.actions.filters.setSuburb(suburb)
    this.props.actions.feed.loadFeed(suburb)
    window.scrollTo(0, 0)
  }

  handleChangePriceRange = (priceRange) => {
    this.props.actions.feed.filterFeedData(priceRange, this.props.filters.bedrooms, this.props.filters.bathrooms)
    this.props.actions.filters.setPriceRange(priceRange)
  }

  handleChangeCompsPriceRange = (priceRange, item) => {
    this.props.actions.feed.filterFeedData(priceRange, [item.num_bedrooms], [item.num_bathrooms])
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

  handleCardClick = (key) => {
    this.props.actions.feed.setFeedSelectedCard(this.props.feed.data.get(key))
    this.props.history.push('/feed/' + key)
  }

  handleScatterPlotDotClick = (key) => {
    this.scrollToRef(this.cardRefs[key])
    this.props.actions.feed.setFeedSelectedCard(this.props.feed.data.get(key))
    this.props.history.push('/feed/' + key)
  }

  handleViewDetails = (value, key) => {
    if (key) {
      this.handleCardClick(key)
      this.props.actions.listingDetails.loadListingDetails(key)
    }
    this.setState({ viewDetails: value })
  }

  handleRequestReport = (value, key) => {
    key && this.handleCardClick(key)
    this.setState({ requestReport: value })
  }

  renderFeed = () => {
    console.log('premium_user:', this.props.user.details)
    return (
      <Grid container justify='center'>
        <Grid item xs={4}>
          <SidePanel height={this.props.height}>
            <Filters
              filters={this.props.filters}
              premium_user={this.props.user.details.premium_user}
              feedLoading={this.props.feed.loading}
              feedCount={this.props.feed.count}
              scatterPlotData={this.props.feed.filtered_data}
              handleChangeSuburb={(suburb) => this.handleChangeSuburb(suburb)}
              handleChangePriceRange={(priceRange) => this.handleChangePriceRange(priceRange)}
              handleChangeRooms={(name, value) => this.handleChangeRooms(name, value)}
              handleScatterPlotDotClick={(key) => this.handleScatterPlotDotClick(key)}
              scrollToRef={(ref) => this.scrollToRef(ref)}
              cardRefs={this.cardRefs}
              item={this.props.feed.selected_card}
              averagePrice={this.props.feed.average_price}
              averagePPSM={this.props.feed.average_ppsm}
              handleBackButton={() => this.props.history.push('/feed')}
              handleChangeTabs={(value, item) => this.handleChangeCardFocusedTab(value, item)}
            />
          </SidePanel>
        </Grid>
        <Grid item xs={8} style={{ paddingRight: 10 }}>
          <FeedCards
            data={this.props.feed.filtered_data}
            Card={Card}
            selected={this.props.id}
            cardRefs={this.cardRefs}
            handleCardClick={(key) => this.handleCardClick(key)}
            handleViewDetails={(item, key) => this.handleViewDetails(item, key)}
            handleRequestReport={(item, key) => this.handleRequestReport(item, key)}
          />
          <Footer width={this.state.width} />
        </Grid>
      </Grid>
    )
  }

  render () {
    return (
      <div style={{ backgroundColor: sc.LIGHT_GREY }}>
        <ViewDetails
          open={this.state.viewDetails}
          item={this.props.feed.selected_card}
          handleViewDetails={(value) => this.handleViewDetails(value)}
        >
          <CardExpanded
            details={this.props.listingDetails.details}
            cardRefs={this.cardRefs}
            item={this.props.feed.selected_card}
          />
        </ViewDetails>
        <RequestReport
          item={this.props.feed.selected_card}
          open={this.state.requestReport}
          requestPayment={() => this.props.actions.paymentActions.requestPayment()}
          handleRequestReport={(value) => this.handleRequestReport(value)}
        >
          {/* <CardExpanded cardRefs={this.cardRefs} item={this.props.feed.selected_card} /> */}
        </RequestReport>
        {this.renderFeed()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.get('filters'),
  feed: state.get('feed'),
  listingDetails: state.get('listingDetails'),
  user: state.get('user')
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    auth: bindActionCreators(AuthActions, dispatch),
    filters: bindActionCreators(FiltersActions, dispatch),
    feed: bindActionCreators(FeedActions, dispatch),
    listingDetails: bindActionCreators(ListingDetailsActions, dispatch),
    paymentActions: bindActionCreators(PaymentActions, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Feed))
