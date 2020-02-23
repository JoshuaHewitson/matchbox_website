import React, { Component } from 'react'
// import windowSize from 'react-window-size'
// import Zoom from '@material-ui/core/Zoom'
import { Typography, Button } from '@material-ui/core'
import {
} from '../components'

import { styleConstants as sc } from '../config'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = ({
    })
  }

  componentDidMount () {
    // this.authListener()
  }

  componentWillMount () {
    // this.getData(this.getSuburb())
  }

  render () {
    return (
      <div>
        <iframe width='100%' height='50%' src='https://www.property24.com/for-sale/de-waterkant/cape-town/western-cape/9141/107085468' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
