import React, { PureComponent } from 'react'
import { Grid, Typography, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PercentageSlider from './PercentageSlider'
import { Price, Percentage, Period } from '../FormatedText'
import CheckableSlider from './CheckableSlider'

import { styleConstants as sc } from '../../config'

import {
  StyledMenuItem,
  StyledCheckBox,
  StyledSelect,
  StyledMultipleSelect,
  StyledInput,
  StyledChip,
  GreyLinearProgress,
  StyledSlider,
  StyledExpansionPanel,
  StyledExpansionPanelSummary
} from '../StyledMaterialUI'

const calcPerAnnumIncome = (monthlyIncome, voidRate) => {
  return (1 - voidRate) * 12 * monthlyIncome
}

const calcGrossYield = (perAnnumIncome, price) => {
  return perAnnumIncome / price
}

const calcNettYield = (perAnnumIncome, totalCosts, price) => {
  return (perAnnumIncome - totalCosts) / price
}
const calcLoanPresentValue = (depositPercentage, price) => {
  return (1 - depositPercentage) * price
}

const calcCashOnCash = (cash, profit) => {
  console.log(cash, profit)
  return profit / cash
}

const calcMonthlyBondPayments = (P, period, interestRate) => {
  var n = period * 365
  const i = (Math.pow(1 + (interestRate / n), n) - 1) / 12
  n = period * 12
  return (P * i) / (1 - Math.pow(1 + i, -n))
}

class RoiCalculationsTab extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      deposit_percentage: 0.25,
      interest_rate: 0.1,
      period: 20,
      estimatedRent: 10000,
      estimatedVoid: 0.08,
      repairs_costs: 0,
      repairs_costs_included: false,
      managing_agent_costs: 0,
      managing_agent_costs_included: false,
      void_percentage: 0,
      void_percentage_included: false,
      insurance_costs: 0,
      insurance_costs_included: false,
      rates_and_taxes: 1000,
      rates_and_taxes_included: true,
      levies: 1000,
      levies_included: true
    }
  }

  calcCosts = () => {
    return (this.state.rates_and_taxes_included ? this.state.rates_and_taxes * 12 : 0) +
      (this.state.levies_included ? this.state.levies * 12 : 0) +
      (this.state.repairs_costs_included ? this.state.repairs_costs : 0) +
      (this.state.managing_agent_costs_included ? this.state.managing_agent_costs * 12 : 0)
  }

  calcTotalCosts = (monthlyBondPayments) => {
    return monthlyBondPayments * 12 + this.calcCosts()
  }

  renderCosts = (monthlyBondPayments) => {
    return (
      <Grid style={{ flex: 1, marginLeft: -10, marginRight: -10, paddingTop: 20 }}>
        <StyledExpansionPanel defaultExpanded>
          <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Price display={this.props.premium_user} label='Costs per annum ' value={this.calcTotalCosts(monthlyBondPayments)} size='medium' />
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction='column'>
              <CheckableSlider
                label='Rates and taxes (monthly)'
                checked={this.state.rates_and_taxes_included}
                checkedValue='rates_and_taxes'
                sliderValue={this.state.rates_and_taxes}
                sliderProps={{ min: 0, max: 10000, step: 100 }}
                handleChangeChecked={(value) => this.setState({ rates_and_taxes_included: value })}
                handleChangeSlider={(value) => this.setState({ rates_and_taxes: value })}
              >
                <Price display={this.props.premium_user} disabled={!this.state.rates_and_taxes_included} value={this.state.rates_and_taxes} size='small' />
              </CheckableSlider>
              <div style={{ height: 20 }} />
              <CheckableSlider
                label='Levies (monthly)'
                checked={this.state.levies_included}
                checkedValue='levies'
                sliderValue={this.state.levies}
                sliderProps={{ min: 0, max: 10000, step: 100 }}
                handleChangeChecked={(value) => this.setState({ levies_included: value })}
                handleChangeSlider={(value) => this.setState({ levies: value })}
              >
                <Price display={this.props.premium_user} disabled={!this.state.levies_included} value={this.state.levies} size='small' />
              </CheckableSlider>
              <div style={{ height: 20 }} />
              <CheckableSlider
                label='Repair costs per annum'
                checked={this.state.repairs_costs_included}
                checkedValue='repairs_costs'
                sliderValue={this.state.repairs_costs}
                sliderProps={{ min: 0, max: 100000, step: 500 }}
                handleChangeChecked={(value) => this.setState({ repairs_costs_included: value })}
                handleChangeSlider={(value) => this.setState({ repairs_costs: value })}
              >
                <Price display={this.props.premium_user} disabled={!this.state.repairs_costs_included} value={this.state.repairs_costs} size='small' />
              </CheckableSlider>
              <div style={{ height: 20 }} />
              <CheckableSlider
                label='Managing agent fees (monthly)'
                checked={this.state.managing_agent_costs_included}
                checkedValue='managing_agent_costs'
                sliderValue={this.state.managing_agent_costs}
                sliderProps={{ min: 0, max: 10000, step: 100 }}
                handleChangeChecked={(value) => this.setState({ managing_agent_costs_included: value })}
                handleChangeSlider={(value) => this.setState({ managing_agent_costs: value })}
              >
                <Price display={this.props.premium_user} disabled={!this.state.managing_agent_costs_included} value={this.state.managing_agent_costs} size='small' />
              </CheckableSlider>
            </Grid>
          </ExpansionPanelDetails>
        </StyledExpansionPanel>
      </Grid>
    )
  }

  renderBondCalculations = (monthlyBondPayments) => {
    return (
      <Grid style={{ flex: 1, marginLeft: -10, marginRight: -10, paddingTop: 20 }}>
        <StyledExpansionPanel defaultExpanded>
          <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Price display={this.props.premium_user} label='Bond payments' value={monthlyBondPayments} size='medium' />
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction='column'>
              <div style={{ width: '100%', height: 10 }} />
              <Percentage display={this.props.premium_user} label='Interest rate' value={this.state.interest_rate} decimal={2} size='small' />
              <div style={{ width: '100%', height: 10 }} />
              <StyledSlider
                value={this.state.interest_rate}
                onChange={(event, value) => this.setState({ interest_rate: value })}
                min={0}
                max={1}
                step={0.00001}
              />
              <div style={{ width: '100%', height: 10 }} />
              <Period display={this.props.premium_user} label='Period' value={this.state.period} decimal={1} size='small' />
              <div style={{ width: '100%', height: 10 }} />
              <StyledSlider
                value={this.state.period}
                onChange={(event, value) => this.setState({ period: value })}
                min={0}
                max={20}
                step={0.5}
              />
            </Grid>
          </ExpansionPanelDetails>
        </StyledExpansionPanel>
      </Grid>
    )
  }

  render () {
    const price = this.props.item.price

    const perAnnumIncome = calcPerAnnumIncome(this.state.estimatedRent, this.state.estimatedVoid)
    const grossYield = calcGrossYield(perAnnumIncome, price)
    const loanPresentValue = calcLoanPresentValue(this.state.deposit_percentage, price)
    const monthlyBondPayments = calcMonthlyBondPayments(loanPresentValue, this.state.period, this.state.interest_rate)
    const perAnnumProfit = perAnnumIncome - this.calcTotalCosts(monthlyBondPayments)
    const nettYield = calcNettYield(perAnnumIncome, this.calcTotalCosts(monthlyBondPayments), price)
    const cashOnCash = calcCashOnCash(this.state.deposit_percentage * price, perAnnumProfit)

    const totalInterest = monthlyBondPayments === 0 ? 0 : (monthlyBondPayments * 12 * this.state.period) - loanPresentValue
    const totalIncome = (perAnnumIncome - this.calcCosts()) * this.state.period
    const totalROI = ((totalIncome - totalInterest) / this.state.period) / price

    console.log(totalIncome, totalInterest)

    return (
      <Grid container>
        <div style={{ width: '100%', height: 50 }} />
        <Price label='Deposit' value={this.state.deposit_percentage * price} size='medium' />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage label='Deposit percentage' value={this.state.deposit_percentage} decimal={0} size='small' />
        <div style={{ width: '100%', height: 10 }} />
        <StyledSlider
          value={this.state.deposit_percentage}
          onChange={(event, value) => this.setState({ deposit_percentage: value })}
          min={0}
          max={1}
          step={0.01}
        />
        {this.renderBondCalculations(monthlyBondPayments)}
        <div style={{ width: '100%', height: 30 }} />
        <Price label='Estimated monthly rent' value={this.state.estimatedRent} size='medium' />
        <div style={{ width: '100%', height: 10 }} />
        <StyledSlider
          value={this.state.estimatedRent}
          onChange={(event, value) => this.setState({ estimatedRent: value })}
          min={0}
          max={100000}
          step={500}
        />
        <div style={{ width: '100%', height: 30 }} />
        <Percentage label='Estimated void percentage' decimal={0} value={this.state.estimatedVoid} size='small' />
        <div style={{ width: '100%', height: 10 }} />
        <StyledSlider
          value={this.state.estimatedVoid}
          onChange={(event, value) => this.setState({ estimatedVoid: value })}
          min={0}
          max={1}
          step={0.01}
        />
        <div style={{ width: '100%', height: 10 }} />
        <Price display={this.props.premium_user} label='Income per annum' value={perAnnumIncome} size='small' />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage display={this.props.premium_user} label='Gross yield' decimal={1} value={grossYield} size='small' />
        <div style={{ width: '100%', height: 10 }} />
        {this.renderCosts(monthlyBondPayments)}
        <div style={{ width: '100%', height: 20 }} />
        <Price display={this.props.premium_user} label='Profit per annum' value={perAnnumProfit} size='small' />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage
          label='Nett yield'
          display={this.props.premium_user}
          decimal={1}
          value={nettYield}
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage
          label='Cash-on-cash return'
          display={this.props.premium_user}
          decimal={1}
          value={cashOnCash}
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        {/*
        <Percentage
          label='Impact on solvency'
          decimal={1}
          value={
            ((1 - this.state.deposit_percentage) / this.state.deposit_percentage) / this.state.period
          }
          size='medium'
        />
        */}
        <div style={{ width: '100%', height: 10 }} />
        <Percentage
          label='Total ROI'
          display={this.props.premium_user}
          decimal={1}
          value={totalROI}
          size='medium'
        />
        <div style={{ width: '100%', height: 60 }} />
      </Grid>

    )
  }
}

export default RoiCalculationsTab
