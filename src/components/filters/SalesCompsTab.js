import React, { PureComponent } from 'react'
import { Grid, Typography, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Price, Percentage, Period } from '../FormatedText'
import CheckableSlider from './CheckableSlider'

import { styleConstants as sc } from '../../config'

import {
  StyledSlider,
  StyledExpansionPanel,
  StyledExpansionPanelSummary
} from '../StyledMaterialUI'
import ScatterPlot from '../ScatterPlot'

const graphSettings = {
  width: 400,
  height: 340,
  padding: 25,
  numDataPoints: 100
  // maxRange: () => Math.random() * 1000
}

class SalesCompsTab extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      deposit_percentage: 0.25,
      interest_rate: 0.1,
      period: 20
    }
  }

  render () {
    return (
      <Grid container>
        <div style={{ width: '100%', height: 50 }} />
        <Price display={this.props.premium_user} label='Average comp price' value={this.props.averagePrice} size='small' />
        <div style={{ width: '100%', height: 10 }} />
        <Price display={this.props.premium_user} label='Average price per m²' value={this.props.averagePPSM} size='small' />
        <div style={{ width: '100%', height: 10 }} />
        <Price display={this.props.premium_user} label='CMA valuation' value={this.props.averagePPSM * this.props.item.floor_size} size='medium' />
        <div style={{ width: '100%', height: 30 }} />
        <ScatterPlot
          data={this.props.scatterPlotData}
          xVal='price' yVal='floor_size'
          xLabel='Price in rands'
          yLabel='Floor size m²'
          handleDotClick={(key) => this.props.scrollToRef(this.props.cardRefs[key])}
          {...graphSettings}
        />
        <div style={{ height: 30 }} />
      </Grid>

    )
  }
}

export default SalesCompsTab
