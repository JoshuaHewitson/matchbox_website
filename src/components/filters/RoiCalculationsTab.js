import React, { PureComponent } from 'react'
import { Grid, Typography, Link, ExpansionPanelDetails } from '@material-ui/core'
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
            <Price
              display={this.props.premium_user}
              label='Costs per annum '
              description='Includes all costs relating to your investment, including the mortgage payment.'
              value={this.calcTotalCosts(monthlyBondPayments)}
              size='medium'
            />
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction='column'>
              <CheckableSlider
                label='Rates and taxes (monthly)'
                description='This is the amount the government charges per month and is based on the size and municipal valuation of the property.'
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
                description='This is the amount the body corporate charges per month to maintain the common areas of the apartment block.'
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
                label='Repair/maitenance (monthly)'
                description='This is an estimated amount of repair/maintenance costs per year and will depend on the current condition of the property.'
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
                description='These are the fees payable to a managing agent if they handle the letting of the property. Fees generally range between 3-6% of the monthly rent.'
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
            <Price
              display={this.props.premium_user}
              label='Bond payments'
              description='This is the amount you will have to repay the bank monthly. It is made up of the interest on your loan, plus a part of the capital amount.'
              value={monthlyBondPayments}
              size='medium'
            />
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction='column'>
              <div style={{ width: '100%', height: 10 }} />
              <Percentage
                display={this.props.premium_user}
                label='Interest rate'
                interactiveDescription
                description={
                  <>
                  This is the unique interest rate the bank will offer you on your loan. The prime lending rate is 10%, but the bank may offer you a slightly higher or lower rate depending on certain factors. Read more about how banks determine interest rates
                    <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                      {' '} here.
                    </Link>
                  </>
                }
                value={this.state.interest_rate}
                decimal={2}
                size='small'
              />
              <div style={{ width: '100%', height: 10 }} />
              <StyledSlider
                value={this.state.interest_rate}
                onChange={(event, value) => this.setState({ interest_rate: value })}
                min={0}
                max={1}
                step={0.00001}
              />
              <div style={{ width: '100%', height: 10 }} />
              <Period
                display={this.props.premium_user}
                label='Payment term'
                description='The number of years over which you will repay your mortgage.'
                value={this.state.period}
                decimal={1}
                size='small'
              />
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

    return (
      <Grid container>
        <div style={{ width: '100%', height: 50 }} />
        <Price
          label='Deposit'
          description='This is the amount of money you initially put towards purchasing the property and represents your equity in the property.'
          value={this.state.deposit_percentage * price}
          size='medium'
        />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage
          label='Deposit percentage'
          description='This is the percentage of equity you initially have in the property by paying a part of the total value.'
          value={this.state.deposit_percentage}
          decimal={0} size='small'
        />
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
        <Price
          label='Estimated monthly rent'
          description='This is the estimated amount of monthly rent that you expect to get from leasing the property.'
          value={this.state.estimatedRent}
          size='medium'
        />
        <div style={{ width: '100%', height: 10 }} />
        <StyledSlider
          value={this.state.estimatedRent}
          onChange={(event, value) => this.setState({ estimatedRent: value })}
          min={0}
          max={100000}
          step={500}
        />
        <div style={{ width: '100%', height: 30 }} />
        <Percentage
          label='Estimated void percentage'
          description='This represents the portion of the year when the apartment might stand empty and not generate any income.'
          decimal={0}
          value={this.state.estimatedVoid}
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        <StyledSlider
          value={this.state.estimatedVoid}
          onChange={(event, value) => this.setState({ estimatedVoid: value })}
          min={0}
          max={1}
          step={0.01}
        />
        <div style={{ width: '100%', height: 10 }} />
        <Price
          display={this.props.premium_user}
          label='Income per annum'
          description='This is your estimate gross income for the year, taking the void period into account. '
          value={perAnnumIncome}
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage
          display={this.props.premium_user}
          label='Gross yield'
          description='This is the yield you would receive on your investment, without taking any expenses into account.'
          decimal={1}
          value={grossYield}
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        {this.renderCosts(monthlyBondPayments)}
        <div style={{ width: '100%', height: 20 }} />
        <Price
          display={this.props.premium_user}
          label='Profit per annum'
          description='Your annual income minus your annual expenses.'
          value={perAnnumProfit}
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage
          label='Nett yield'
          description='Profit per annum divided by the price of the property.'
          display={this.props.premium_user}
          decimal={1}
          value={nettYield}
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        <Percentage
          label='Cash on cash return'
          description='Profit per annum divided by the cash you invested (initIal deposit amount).'
          display={this.props.premium_user}
          decimal={1}
          value={cashOnCash}
          size='small'
        />
        <div style={{ width: '100%', height: 20 }} />
        <Percentage
          label='Total ROI'
          interactiveDescription
          description={
            <>
            Total income over the mortgage period, minus your total interest paid over the period, divided by the price of the property.
              <br />
              <br />
              *These calculations do not take into account the future value of the property or any potential increase in rental income over the period.
              <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                {' '} read more.
              </Link>
            </>
          }
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
