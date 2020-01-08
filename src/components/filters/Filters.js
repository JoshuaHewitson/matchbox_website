import React, { PureComponent } from 'react'
import { styleConstants as sc } from '../../config'
import { Grid } from '@material-ui/core'
import SearchFiltersTab from './SearchFiltersTab'

import {
  StyledTab,
  StyledTabs,
  StyledLinearProgress
} from '../StyledMaterialUI'

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

class Filters extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0
    }
  }

  handleChangeTabs = (name, event, newValue) => {
    this.setState({ [name]: newValue })
  }

  render () {
    return (
      <Grid style={{ flex: 1 }}>
        {(this.props.filters.loading || this.props.feedLoading) && <StyledLinearProgress variant='query' />}
        <StyledTabs value={this.state.tabIndex} onChange={(event, value) => this.handleChangeTabs('tabIndex', event, value)} aria-label='styled tabs example'>
          <StyledTab label='Search results' />
          <StyledTab label='Shortlist' />
        </StyledTabs>
        <TabPanel value={this.state.tabIndex} index={0}>
          <SearchFiltersTab {...this.props} />
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={1}>
                Item Two
        </TabPanel>
      </Grid>
    )
  }
}

export default Filters
