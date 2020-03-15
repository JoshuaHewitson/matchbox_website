import React, { Component } from 'react'
// import windowSize from 'react-window-size'
// import Zoom from '@material-ui/core/Zoom'
import { Typography, Button, TextField, CircularProgress, Grid } from '@material-ui/core'
import { FeedCard, ImageViewer, PropertyInfo } from '../components'

import { styleConstants as sc } from '../config'

import * as ScrapingActions from '../redux/actions/ScrapingActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      urlInput: ''
    })
  }

  componentDidMount () {
    // this.authListener()
    // const initialURL = 'https://www.tysonprop.co.za/results/residential/for-sale/atlantic-seaboard/green-point/'// 'https://www.seeff.com/results/residential/for-sale/cape-town/sea-point'// 'https://www.seeff.com/results/residential/for-sale/cape-town/green-point/' // 'https://www.tysonprop.co.za/results/residential/for-sale/atlantic-seaboard/green-point/house/53609/' // 'https://www.seeff.com/results/residential/for-sale/cape-town/green-point/house/66051/'
    // this.props.actions.ScrapingActions.getPageHTML(initialURL)
  }

  componentWillMount () {
    // this.getData(this.getSuburb())
  }

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.value })
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

  render () {
    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        Input propData starting URL: {this.renderInput('urlInput', 'urlInput', 'urlInput', 'enter url')}
        <Button onClick={() => this.props.actions.ScrapingActions.getPageHTML(this.state.urlInput)}>scrape</Button>
        <br /><br /><div style={{ color: sc.BODY_TEXT_COLOR }}><i>https://www.tysonprop.co.za/results/residential/for-sale/atlantic-seaboard/green-point/</i></div>
        <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: sc.LIGHT_GREY }}>
          {this.props.scraping.loading && <CircularProgress style={{ color: sc.PRIMARY_COLOR }} size={40} />}
          {this.props.scraping.data !== '' && this.props.scraping.data.map((item, index) => {
            // const newItem =
            for (var i in item.images) {
              item.images[i].src = 'https://' + item.images[i].large
            }
            item.price = Number(item.price.replace(/,|R/g, ''))
            item.suburb = item.addressLocality
            console.log(item, index)
            return (
              <FeedCard key={index} item={item} selected={false} expanded={false} addRef={() => {}}>
                <ImageViewer numBedrooms={item.numberOfRooms} numBathrooms={item.numberOfBathroomsTotal} floorSize={item.floorSize} images={item.images} />
                <PropertyInfo onClick={() => {}} {...item} />
              </FeedCard>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  scraping: state.get('scraping')
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ScrapingActions: bindActionCreators(ScrapingActions, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
