import React, { Component } from 'react'
// import Typography from '@material-ui/core/Typography'
import { AppBar, Toolbar, Button, Grid, IconButton, Menu, MenuItem } from '@material-ui/core'
import HighlightLine from './HighlightLine'
import logoText from '../assets/logoText.svg'
import menuIcon from '../assets/menuIcon.svg'
import AppBarMenu from './AppBarMenu'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
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

class TopNavigationBar extends Component {
   changePath = (path) => {
     window.scrollTo(0, 0)
     this.props.history.push(path)
   }

  renderButton = (text, path) => {
    console.log(this.props.match)
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
            this.changePath(path)
          }}
        >
          {text}
        </TopBarButton>
        <Grid container justify='center'>
          {this.props.match.url === path && <HighlightLine />}
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
              <Grid container justify='space-between' alignItems='center' style={{ flex: 1, maxWidth: 950 }}>
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
                      this.changePath('/')
                    }}
                  >
                    <img src={logoText} style={{ height: 16 }} />
                  </MatchboxButton>
                  <Grid container justify='center'>
                    {this.props.match.url === '/' && <HighlightLine />}
                  </Grid>
                </Grid>
                {this.renderButton('find property', '/feed')}
                {this.renderButton('admin', '/admin')}
                {this.renderButton('pricing', '/pricing')}
                {this.renderButton('about us', '/about_us')}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(TopNavigationBar)
