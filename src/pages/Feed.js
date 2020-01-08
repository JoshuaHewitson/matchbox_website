import React, { Component } from 'react'
import { Grid, Paper, Box, Container, FormControlLabel, FormGroup, Typography, Button } from '@material-ui/core'
import {
  SidePanel,
  Filters,
  CardFocusedPanel,
  Footer,
  ScatterPlot,
  ContentContainer,
  TextContainer,
  FeedList,
  FeedCard,
  ImageViewer,
  PropertyInfo,
  TopNavigationBar,
  PriceSlider,
  PercentageSlider,
  Price
} from '../components'

import {
  StyledMenuItem,
  StyledCheckBox
} from '../components/StyledMaterialUI'

import { styleConstants as sc } from '../config'
import { withRouter } from 'react-router-dom'
import '../App.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FiltersActions from '../redux/actions/FiltersActions'
import * as FeedActions from '../redux/actions/FeedActions'
import PropertyDetails from '../components/filters/PropertyDetails'

const FeedCards = (props) => {
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ flex: 2 }}
    >
      <FeedList data={props.data} renderItem={(item) => <props.Card item={item} expanded={props.expanded} cardRefs={props.cardRefs} onClick={props.handleCardClick} />} />
    </Grid>
  )
}

const Card = (props) => {
  return (
    <FeedCard expanded={props.expanded} item={props.item} key={props.item.key} addRef={(ref, key) => { props.cardRefs[key] = ref }}>
      <ImageViewer numBedrooms={props.item.num_bedrooms} numBathrooms={props.item.num_bathrooms} floorSize={props.item.floor_size} images={props.item.images} />
      <PropertyInfo onClick={() => props.onClick(props.item.key)} {...props.item}>
        <Grid container flexDirection='row' alignItems='center'>
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
          <Button style={{ color: 'white', borderRadius: 20, paddingLeft: 20, paddingRight: 20, marginTop: 10, marginRight: 10, backgroundColor: sc.PRIMARY_COLOR }} onClick={() => {}}>Request Report</Button>
        </Grid>
      </PropertyInfo>
    </FeedCard>
  )
}

const CardExpanded = (props) => {
  return (
    <FeedCard expanded={props.expanded} item={props.item} key={props.item.key} addRef={(ref, key) => { props.cardRefs[key] = ref }}>
      <Grid container>
        <ImageViewer numBedrooms={props.item.num_bedrooms} numBathrooms={props.item.num_bathrooms} floorSize={props.item.floor_size} images={props.item.images} />
      </Grid>
      <Grid container flexDirection='row' alignItems='center' justify='flex-end' style={{ padding: 20, paddingBottom: 10 }}>
        <FormGroup style={{ marginRight: 10 }}>
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
        <Button style={{ color: 'white', borderRadius: 20, paddingLeft: 20, paddingRight: 20, marginRight: 10, backgroundColor: sc.PRIMARY_COLOR }} onClick={() => {}}>Request Report</Button>
      </Grid>
      <Grid container>
        <PropertyDetails {...props.item} />
      </Grid>
    </FeedCard>
  )
}

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      user: null,
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
      resultsCount: 0
    })
    this.variables = ['price', 'floor_size', 'num_bedrooms', 'num_bathrooms']
    this.numRoomsOptions = ['any', '1', '2', '3', '4', '5', '6+']
    this.cardRefs = {}
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

  renderFeedStateContent = (state) => {
    switch (state) {
      case 'search_results':
        return (
          <Grid container justify='center'>
            <Grid item xs={4}>
              <SidePanel height={this.props.height}>
                <Filters
                  filters={this.props.filters}
                  feedLoading={this.props.feed.loading}
                  feedCount={this.props.feed.count}
                  scatterPlotData={this.props.feed.filtered_data}
                  handleChangeSuburb={(suburb) => this.handleChangeSuburb(suburb)}
                  handleChangePriceRange={(priceRange) => this.handleChangePriceRange(priceRange)}
                  handleChangeRooms={(name, value) => this.handleChangeRooms(name, value)}
                  scrollToRef={(ref) => this.scrollToRef(ref)}
                  cardRefs={this.cardRefs}
                />
              </SidePanel>
            </Grid>
            <Grid item xs={8} style={{ paddingRight: 10 }}>
              <FeedCards
                data={this.props.feed.filtered_data}
                Card={Card}
                cardRefs={this.cardRefs}
                handleCardClick={(key) => this.props.history.push('/view_property/' + key)}
              />
              <Footer width={this.state.width} />
            </Grid>
          </Grid>
        )
      case 'shortlist':
        return (
          <div>
            {this.renderFilters()}
            {this.renderFeedCards()}
          </div>
        )
      case 'card_focused':
        return (
          this.props.feed.loading
            ? <Grid container justify='center'>
              <Grid item xs={4}>
                <SidePanel height={this.props.height}>
                  <CardFocusedPanel
                    filters={this.props.filters}
                    feedLoading={this.props.feed.loading}
                    handleBackButton={() => this.props.history.push('/feed')}
                    scatterPlotData={[]}
                  />
                </SidePanel>
              </Grid>
              <Grid item xs={8}>
                <FeedCards data={[]} expanded />
              </Grid>
            </Grid>
            : <Grid container justify='center'>
              <Grid item xs={4}>
                <SidePanel height={this.props.height}>
                  <CardFocusedPanel
                    filters={this.props.filters}
                    item={this.props.feed.data.get(this.props.id)}
                    averagePrice={this.props.feed.average_price}
                    averagePPSM={this.props.feed.average_ppsm}
                    feedLoading={this.props.feed.loading}
                    scatterPlotData={this.props.feed.filtered_data}
                    scrollToRef={(ref) => this.scrollToRef(ref)}
                    cardRefs={this.cardRefs}
                    handleBackButton={() => this.props.history.push('/feed')}
                    handleChangeTabs={(value) => this.handleChangeTabs('cardFocusedTabIndex', value)}
                  />
                </SidePanel>
              </Grid>
              <Grid item xs={8}>
                {this.state.cardFocusedTabIndex === 0
                  ? <FeedCards
                    data={[this.props.feed.data.get(this.props.id)]}
                    Card={CardExpanded}
                    cardRefs={this.cardRefs}
                    handleCardClick={() => {}}
                    />
                  : <FeedCards
                    data={this.props.feed.filtered_data}
                    Card={Card}
                    cardRefs={this.cardRefs}
                    handleCardClick={(key) => this.props.history.push('/view_property/' + key)}
                    />}
              </Grid>
            </Grid>
        )
    }
  }

  renderFeed = () => {
    return (
      <div style={{ backgroundColor: sc.LIGHT_GREY }}>
        <TopNavigationBar value='feed' position='static' onChange={id => this.handleChangePath(id)} />
        <TopNavigationBar value='feed' position='fixed' />
        {this.renderFeedStateContent(this.props.feedState)}
      </div>
    )
  }

  render () {
    console.log(this.props.filters.suburb)
    return (
      <div style={{ backgroundColor: 'white' }}>
        <div>
          {this.renderFeed()}
        </div>

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
)(withRouter(Feed))
