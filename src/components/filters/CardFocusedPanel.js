import React, { PureComponent } from 'react'
import { styleConstants as sc } from '../../config'
import { Grid } from '@material-ui/core'

import TextContainer from '../TextContainer'
import RoiCalculationsTab from './RoiCalculationsTab'
import SalesCompsTab from './SalesCompsTab'

import {
  StyledTab,
  StyledTabs,
  StyledLinearProgress
} from '../StyledMaterialUI'
import TopBar from './TopBar'

const TabPanel = (props) => {
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

class CardFocusedPanel extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0
    }
  }

  handleChangeTabs = (name, event, value) => {
    this.setState({ [name]: value })
    this.props.handleChangeTabs(value)
  }

  render () {
    return (
      <Grid style={{ flex: 1 }}>
        {(this.props.filters.loading || this.props.feedLoading) && <StyledLinearProgress variant='query' />}
        <TopBar item={this.props.item} handleBackButton={() => this.props.handleBackButton()} thumb={this.props.feedLoading ? '' : this.props.item.images[0].src} />
        <StyledTabs value={this.state.tabIndex} onChange={(event, value) => this.handleChangeTabs('tabIndex', event, value)} aria-label='styled tabs example'>
          <StyledTab label='ROI Calculations' />
          <StyledTab label='Sales Comps' />
        </StyledTabs>
        <TabPanel value={this.state.tabIndex} index={0}>
          <RoiCalculationsTab {...this.props} />
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={1}>
          <SalesCompsTab {...this.props} />
        </TabPanel>
      </Grid>
    )
  }
}

CardFocusedPanel.defaultProps = {
  item: { price: 0 }
}

export default CardFocusedPanel
