import React, { PureComponent } from 'react'
import { Grid, Typography, Button, Link, CircularProgress } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { TopNavigationBar, TopFiller, Divider, PaymentButton } from '../components'

import { Price, IncludedItem } from '../components/FormatedText'

import { styleConstants as sc } from '../config'

import CheckIcon from '@material-ui/icons/Check'

import { firebaseAuth } from '../services/Firebase'

import {
  StyledSlider,
  StyledExpansionPanel,
  StyledExpansionPanelSummary
} from '../components/StyledMaterialUI'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PaymentActions from '../redux/actions/PaymentActions'
import * as AuthActions from '../redux/actions/AuthActions'

class Pricing extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      deposit_percentage: 0.25,
      interest_rate: 0.1,
      period: 20,
      button1Loading: false,
      button2Loading: false
    }
  }

  renderSubscribed = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant='text'
          style={{ border: `1px solid ${sc.LIGHT_GREY}`, color: sc.BODY_TEXT_COLOR, marginRight: 15 }}
          disableRipple onClick={() => {}}
        >Cancel subscription
        </Button>
        <CheckIcon fontSize='large' style={{ color: sc.PRIMARY_COLOR, marginRight: 5 }} />
        <Typography variant='h6' style={{ color: sc.PRIMARY_COLOR }}>Subscribed</Typography>
      </div>
    )
  }

  render () {
    return (
      <Grid container style={{ backgroundColor: sc.LIGHT_GREY }}>
        <Grid container justify='center' style={{ height: this.props.height, paddingTop: 20 }}>
          <Grid item xs={4}>
            <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, border: '1px solid rgb(47,230,166)', backgroundColor: 'white', borderRadius: 5, margin: 20 }}>
              <div style={{ borderBottom: `1px solid ${sc.LIGHT_GREY}`, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}><i>Premium investor plan</i></Typography>
              </div>
              <Grid container justify='center' alignItems='center' style={{ padding: 30 }}>
                <div style={{ width: '100%', height: 30 }} />
                <Typography variant='h6' style={{ marginRight: 30, color: sc.PRIMARY_COLOR }}>R</Typography>
                <Typography variant='h2' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}> 150</Typography>
                <Typography variant='h6' style={{ marginLeft: 30, color: sc.PRIMARY_COLOR }}>pm</Typography>
                <div style={{ width: '100%', height: 30 }} />
                <Divider />
                <div style={{ width: '100%', height: 30 }} />

                <IncludedItem
                  label='Interactive market analysis'
                  // description='Allows you to see size and pricing of all other properties on the market + how they compare to the property you have selected.'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Real time property comparisons'
                  // description='Allows you to see size and pricing of all other properties on the market + how it compares to the property you have selected.'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />

                <div style={{ display: 'flex', flex: 1 }}>
                  <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}>Calculators for: </Typography>
                </div>
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Cash on cash return'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Total return on investment'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Bond calculator'
                  included size='small'
                />
                {/*
                <IncludedItem
                  label='Rental calculators'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Market-to-rent ratio'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Loan-to-value ratio'
                  included size='small'
                />
                */}

                {/*
                <IncludedItem
                  label='Individual property report'
                  interactiveDescription
                  description={
                    <>
                      See sample report
                      <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                        {' '} here.
                      </Link>
                    </>
                  }
                  size='small'
                />
                */}
                <div style={{ width: '100%', height: 30 }} />
                {/*
                <IncludedItem
                  label='Individual property inspection'
                  interactiveDescription
                  description={
                    <>
                    We send an analyst to do a physical inspection of the property and generate a full report. See sample report
                      <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                        {' '} here.
                      </Link>
                    </>
                  }
                  size='small'
                />
                <div style={{ width: '100%', height: 30 }} />
                */}
                <Divider />
                <div style={{ width: '100%', height: 30 }} />
                {this.props.user.details.premium_user ? this.renderSubscribed()
                  : <Button
                    // disabled
                    style={{
                      minWidth: 150,
                      minHeight: 40,
                      color: 'white',
                      borderRadius: 20,
                      paddingLeft: 20,
                      paddingRight: 20,
                      margin: 10,
                      backgroundColor: sc.PRIMARY_COLOR
                    }}
                    onClick={() => {
                      if (firebaseAuth.currentUser.isAnonymous) {
                        this.props.actions.authActions.setLoginDialogueOpen(true)
                      } else {
                        this.setState({ button1Loading: true })
                        this.props.actions.paymentActions.requestSubscription('150')
                      }
                    }}
                  >{this.state.button1Loading ? <CircularProgress color='white' size={20} /> : 'BUY NOW'}
                    </Button>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, backgroundColor: 'white', borderRadius: 5, margin: 20 }}>
              <div style={{ borderBottom: `1px solid ${sc.LIGHT_GREY}`, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}><i>Pro investor plan</i></Typography>
              </div>
              <Grid container justify='center' alignItems='center' style={{ padding: 30 }}>
                <div style={{ width: '100%', height: 30 }} />
                <Typography variant='h6' style={{ marginRight: 30, color: sc.PRIMARY_COLOR }}>R</Typography>
                <Typography variant='h2' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}> 450</Typography>
                <Typography variant='h6' style={{ marginLeft: 30, color: sc.PRIMARY_COLOR }}>pm</Typography>
                <div style={{ width: '100%', height: 30 }} />
                <Divider />
                <div style={{ width: '100%', height: 30 }} />
                <IncludedItem
                  label='Premium investor plan'
                  description='Full access to all items listed in premium investor plan'
                  included
                  size='small'
                />
                <div style={{ width: '100%', height: 20 }} />
                <IncludedItem
                  label='Individual property report'
                  interactiveDescription
                  /*
                  description={
                    <>
                    See sample report
                      <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                        {' '} here.
                      </Link>
                    </>
                  }
                  */
                  included
                  quantity={2}
                  size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <div style={{ display: 'flex', flex: 1 }}>
                  <Typography variant='subtitle1' style={{ color: sc.BODY_TEXT_COLOR }}>Including: </Typography>
                </div>
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Municipal valuation'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Last sold price'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Projected rental income'
                  included size='small'
                />
                <div style={{ width: '100%', height: 10 }} />
                <IncludedItem
                  label='Projected Airbnb income'
                  included size='small'
                />
                <div style={{ width: '100%', height: 30 }} />
                {/*
                <IncludedItem
                  label='Individual property inspection'
                  included
                  quantity={2}
                  interactiveDescription
                  description={
                    <>
                  We send an analyst to do a physical inspection of the property and generate a full report. See sample report
                      <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                        {' '} here.
                      </Link>
                    </>
                  }
                  size='small'
                />
                <div style={{ width: '100%', height: 30 }} />
                */}
                <Divider />
                <div style={{ width: '100%', height: 30 }} />
                <Button
                  disabled
                  style={{
                    minWidth: 150,
                    minHeight: 40,
                    color: 'white',
                    borderRadius: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    margin: 10,
                    backgroundColor: sc.BODY_TEXT_COLOR
                  }}
                  onClick={() => {
                    // this.setState({ button2Loading: true })
                    // this.props.actions.paymentActions.requestSubscription('450')
                  }}
                >
                  {this.state.button2Loading ? <CircularProgress color='white' size={20} /> : 'COMING SOON'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.get('user')
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    paymentActions: bindActionCreators(PaymentActions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pricing)
