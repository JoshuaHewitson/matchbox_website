import React, { PureComponent } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { TopNavigationBar, Divider } from '../components'

import { Price, IncludedItem } from '../components/FormatedText'

import { styleConstants as sc } from '../config'

import {
  StyledSlider,
  StyledExpansionPanel,
  StyledExpansionPanelSummary
} from '../components/StyledMaterialUI'

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
      <Grid container style={{ backgroundColor: sc.LIGHT_GREY }}>
        <TopNavigationBar value='pricing' position='static' onChange={id => this.handleChangePath(id)} />
        <TopNavigationBar value='pricing' position='fixed' />
        <Grid container justify='center' style={{ height: this.props.height, paddingTop: 20 }}>
          <Grid item xs={3}>
            <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, backgroundColor: 'white', borderRadius: 5, margin: 10, padding: 30 }}>
              <Grid container justify='center' alignItems='center'>
                <div style={{ width: '100%', height: 30 }} />
                <Typography variant='h6' style={{ marginRight: 30, color: sc.PRIMARY_COLOR }}>R</Typography>
                <Typography variant='h2' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}> 150</Typography>
                <Typography variant='h6' style={{ marginLeft: 30, color: sc.PRIMARY_COLOR }}>pm</Typography>
                <div style={{ width: '100%', height: 30 }} />
                <Divider />
                <div style={{ width: '100%', height: 30 }} />
                <IncludedItem label='Full access to calculators' included size='small' />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem label='Comparative market analysis' included size='small' />
                <div style={{ width: '100%', height: 20 }} />
                <IncludedItem label='Individual property report' size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <IncludedItem label='Individual property inspection' size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <Divider />
                <div style={{ width: '100%', height: 30 }} />
                <Button
                  style={{
                    color: 'white',
                    borderRadius: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    margin: 10,
                    backgroundColor: sc.PRIMARY_COLOR
                  }}
                  onClick={() => {}}
                >BUY NOW
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, border: '1px solid rgb(47,230,166)', backgroundColor: 'white', borderRadius: 5, margin: 10, padding: 30 }}>
              <Grid container justify='center' alignItems='center'>
                <div style={{ width: '100%', height: 30 }} />
                <Typography variant='h6' style={{ marginRight: 30, color: sc.PRIMARY_COLOR }}>R</Typography>
                <Typography variant='h2' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}> 450</Typography>
                <Typography variant='h6' style={{ marginLeft: 30, color: sc.PRIMARY_COLOR }}>pm</Typography>
                <div style={{ width: '100%', height: 30 }} />
                <Divider />
                <div style={{ width: '100%', height: 30 }} />
                <IncludedItem label='Full access to calculators' included size='small' />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem label='Comparative market analysis' included size='small' />
                <div style={{ width: '100%', height: 20 }} />
                <IncludedItem label='Individual property report' included quantity={2} size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <IncludedItem label='Individual property inspection' included quantity={2} size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <Divider />
                <div style={{ width: '100%', height: 30 }} />
                <Button
                  style={{
                    color: 'white',
                    borderRadius: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    margin: 10,
                    backgroundColor: sc.PRIMARY_COLOR
                  }}
                  onClick={() => {}}
                >BUY NOW
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, backgroundColor: 'white', borderRadius: 5, margin: 10, padding: 30 }}>
              <Grid container justify='center'>
                <div style={{ width: '100%', height: 30 }} />
                <Price label='Deposit' value={100000} size='medium' />
                <div style={{ width: '100%', height: 30 }} />
                <Price label='Deposit' value={100000} size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <Price label='Deposit' value={100000} size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <Price label='Deposit' value={100000} size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <Price label='Deposit' value={100000} size='small' />
                <div style={{ width: '100%', height: 30 }} />
                <Price label='Deposit' value={100000} size='medium' />
                <div style={{ width: '100%', height: 30 }} />
                <Button
                  style={{
                    color: 'white',
                    borderRadius: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    margin: 10,
                    backgroundColor: sc.PRIMARY_COLOR
                  }}
                  onClick={() => {}}
                >BUY NOW
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default SalesCompsTab
