import React, { Component } from 'react'
// import Typography from '@material-ui/core/Typography'
import { AppBar, Toolbar, Button, Grid, IconButton, Menu, MenuItem } from '@material-ui/core'
import HighlightLine from './HighlightLine'
import logoText from '../assets/logoText.svg'
import menuIcon from '../assets/menuIcon.svg'
import AppBarMenu from './AppBarMenu'
import { withStyles } from '@material-ui/core/styles'
import { styleConstants as sc } from '../config'
import '../App.css'

const TopBarButton = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.05)'
    }
  }
}))(Button)

const MatchboxButton = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.05)'
    }
  }
}))(IconButton)

class TopBar extends Component {
  renderButton = (text, num) => {
    return (
      <Grid>
        <TopBarButton
          className='button2'
          disableRipple
          disableFocusRipple
          style={{
            color: sc.BODY_TEXT_COLOR,
            minWidth: 100
            // marginRight: 20
          }}
          onClick={() => {
            this.props.handleViewPageSection(this.props.pageRefs[num], num)
          }}
        >
          {text}
        </TopBarButton>
        <Grid container justify='center'>
          {this.props.selected === num && <HighlightLine />}
        </Grid>
      </Grid>
    )
  }

  render () {
    return (
      <div>
        <AppBar
          position={this.props.position} style={{
            background: 'white',
            boxShadow: 'none'
            // borderBottom: 'solid #dddddd 0.5px'
          }}
        >
          <Toolbar>
            <Grid container justify='center'>
              <Grid container justify='space-between' alignItems='center' style={{ flex: 1, maxWidth: 1050 }}>
                {this.props.width < 1000 && <AppBarMenu renderButton={(text, num) => this.renderButton(text, num)} />}
                <Grid>
                  <MatchboxButton
                    // className='button2'
                    disableRipple
                    disableFocusRipple
                    style={{
                      color: sc.BODY_TEXT_COLOR,
                      minWidth: 100
                      // marginRight: 20
                    }}
                    onClick={() => {
                      this.props.handleViewPageSection(this.props.pageRefs[0], 0)
                    }}
                  >
                    <img src={logoText} style={{ height: 22 }} />
                  </MatchboxButton>
                  <Grid container justify='center'>
                    {this.props.selected === 0 && <HighlightLine />}
                  </Grid>
                </Grid>
                {this.props.width > 1000 && this.renderButton('Buying / Renting', 1)}
                {this.props.width > 1000 && this.renderButton('Selling / renting out', 2)}
                {this.props.width > 1000 && this.renderButton('Agents', 3)}
                {this.props.width > 1000 && this.renderButton('About us', 4)}
                {this.props.width > 1000 && this.renderButton('Contact', 5)}
                {this.props.width < 1000 && <Grid />}
                {this.props.width < 1000 && <Grid />}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default TopBar
