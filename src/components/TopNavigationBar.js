import React, { PureComponent } from 'react'
// import Typography from '@material-ui/core/Typography'
import {
  TextField,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonBase,
  Typography,
  SvgIcon
} from '@material-ui/core'
import LoginForm from './LoginForm'
import PersonIcon from '@material-ui/icons/Person'
import HighlightLine from './HighlightLine'
import logoText from '../assets/logoText.svg'
import { StyledLinearProgress } from './StyledMaterialUI'

import { GoogleLogin } from 'react-google-login'

import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { styleConstants as sc } from '../config'
import '../App.css'
import { firebaseAuth } from '../services/Firebase'
import RegistrationForm from './RegistrationForm'
import googleLogo from '../assets/Google__G__Logo.svg'

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

class TopNavigationBar extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loginForm: 'login',
      // loginFormOpen: false,
      loginLoading: false,
      loginFail: false,
      registrationLoading: false,
      registrationFail: false,
      anchorEl: null,
      error: { message: '' }
    }
    this.login = { submit: () => {} }
    this.registration = { submit: () => {} }
  }

   changePath = (path) => {
     window.scrollTo(0, 0)
     this.props.history.push(path)
   }

   handleLoginButton = () => {
     // this.setState({ loginFormOpen: true })
     this.props.authActions.setLoginDialogueOpen(true)
   }

   handleLoginFormClose = () => {
     // this.setState({ loginFormOpen: false })
     this.props.authActions.setLoginDialogueOpen(false)
   }

   handleAttemptLogin = (email, password) => {
     this.setState({ loginLoading: true })
     this.props.authActions.emailLogin(
       email,
       password,
       this.handleLoginSuccessful,
       err => this.handleLoginFail(err))
   }

   handleLoginSuccessful = () => {
     this.handleLoginFormClose()
     this.handleUserMenuClose()
     this.setState({ loginLoading: false, loginFail: false })
   }

   handleLoginFail = (e) => {
     this.setState({ loginLoading: false, loginFail: true, error: e })
   }

   handleAttemptRegistration = (firstName, lastName, email, password) => {
     this.setState({ registrationLoading: true })
     this.props.authActions.userRegistration(
       firstName,
       lastName,
       email,
       password,
       this.handleRegistrationSuccessful,
       err => this.handleRegistrationFail(err))
   }

   handleRegistrationSuccessful = () => {
     this.handleLoginFormClose()
     this.handleUserMenuClose()
     this.setState({ registrationLoading: false, registrationFail: false })
   }

   handleRegistrationFail = (e) => {
     this.setState({ registrationLoading: false, registrationFail: true, error: e })
   }

   handleUserMenuClick = event => {
     this.setState({ anchorEl: document.getElementById('userMenu') })
   }

  handleUserMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  renderButton = (text, path) => {
    const activePage = this.props.match.url.split('/')[1]
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
          {'/' + activePage === path && <HighlightLine />}
        </Grid>
      </Grid>
    )
  }

  renderGoogleButton = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          marginBottom: 20,
          marginTop: 20,
          border: `1px solid ${sc.LIGHT_GREY}`
        }} onClick={() => this.props.authActions.googleAuthLogin(this.handleLoginSuccessful, err => this.handleLoginFail(err))}
      >
        <img alt='G' style={{ width: 40, height: 40, marginRight: 20 }} src={googleLogo} />
        <Typography style={{ color: sc.BODY_TEXT_COLOR }}>Sign in with Google</Typography>
      </div>
    )
  }

  renderLoginDialogue = () => {
    return (
      <Dialog
        open={this.props.auth.loginDialogueOpen}
        onClose={() => this.handleLoginFormClose()}
        aria-labelledby='form-dialog-title'
      >
        {this.state.loginLoading && <StyledLinearProgress />}
        <DialogTitle style={{ color: sc.SECONDARY_COLOR_DARK_2 }} id='form-dialog-title'>Login</DialogTitle>
        {this.renderGoogleButton()}
        <DialogContent>
          <Typography style={{ color: sc.BODY_TEXT_COLOR }}>Enter your email and password below.</Typography>
          <br />
          <div style={{ width: '100%' }}>
            {this.state.loginFail && <Typography variant='caption' style={{ color: sc.ERROR_TEXT_COLOR }}>login failed: {this.state.error.message}</Typography>}
          </div>
          <div style={{ width: '100%', height: 20 }} />
          <LoginForm
            ref={ref => { this.login = ref }}
            handleLogin={(email, password) => this.handleAttemptLogin(email, password)}
          />
          <div style={{ width: '100%', height: 20 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography style={{ color: sc.BODY_TEXT_COLOR, marginRight: 20 }}>Don't have an account?</Typography>
            <Button
              variant='text'
              style={{ border: `1px solid ${sc.LIGHT_GREY}`, color: sc.SECONDARY_COLOR_DARK_2 }}
              disableRipple onClick={() => this.setState({ loginForm: 'create_account' })}
            >Create a new account.
            </Button>
          </div>
          <div style={{ width: '100%', height: 20 }} />
        </DialogContent>
        <DialogActions style={{ borderTop: `1px solid ${sc.LIGHT_GREY}` }}>
          <Button
            onClick={() => this.handleLoginFormClose()}
            style={{ color: sc.BODY_TEXT_COLOR }} color={sc.PRIMARY_COLOR}
          >
            Cancel
          </Button>
          <Button
            onClick={() => this.login.submit()}
            style={{ color: sc.PRIMARY_COLOR }} color={sc.PRIMARY_COLOR}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderCreateAccountDialogue = () => {
    return (
      <Dialog
        open={this.props.auth.loginDialogueOpen}
        onClose={() => this.handleLoginFormClose()}
        aria-labelledby='form-dialog-title'
      >
        {this.state.registrationLoading && <StyledLinearProgress />}
        <DialogTitle style={{ color: sc.SECONDARY_COLOR_DARK_2 }} id='form-dialog-title'>Create Account</DialogTitle>
        {this.renderGoogleButton()}
        <DialogContent>
          <Typography style={{ color: sc.BODY_TEXT_COLOR }}>Enter your details below.</Typography>
          <br />
          <div style={{ width: '100%', height: 20 }} />
          <RegistrationForm
            ref={ref => { this.registration = ref }}
            handleRegistration={
              (firstName, lastName, email, password) =>
                this.handleAttemptRegistration(firstName, lastName, email, password)
            }
          />
          <div style={{ width: '100%', height: 20 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography style={{ color: sc.BODY_TEXT_COLOR, marginRight: 20 }}>Already have an account?</Typography>
            <Button
              variant='text'
              style={{ border: `1px solid ${sc.LIGHT_GREY}`, color: sc.SECONDARY_COLOR_DARK_2 }}
              disableRipple onClick={() => this.setState({ loginForm: 'login' })}
            >Sign in instead.
            </Button>
          </div>
          <div style={{ width: '100%', height: 20 }} />
        </DialogContent>
        <DialogActions style={{ borderTop: `1px solid ${sc.LIGHT_GREY}` }}>
          <Button
            onClick={() => this.handleLoginFormClose()}
            style={{ color: sc.BODY_TEXT_COLOR }} color={sc.PRIMARY_COLOR}
          >
            Cancel
          </Button>
          <Button
            onClick={() => this.registration.submit()}
            style={{ color: sc.PRIMARY_COLOR }} color={sc.PRIMARY_COLOR}
          >
            Create account
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderLoginButton = () => {
    return (
      <Grid container justify='center' alignItems='center' style={{ flex: 1 }}>
        <Button
          key='loginButton'
          disableRipple
          disableFocusRipple
          style={{
            color: 'white',
            backgroundColor: sc.PRIMARY_COLOR,
            borderRadius: 3,
            minWidth: 100
            // marginLeft: 20
          }}
          onClick={() => {
            this.handleLoginButton()
          }}
        >
          Login
        </Button>
        {this.state.loginForm === 'login' ? this.renderLoginDialogue() : this.renderCreateAccountDialogue()}
      </Grid>
    )
  }

  renderUserMenu = () => {
    console.log(this.props.userDetails)
    return (
      <Grid container justify='center' alignItems='center' style={{ flex: 1 }}>
        <ButtonBase key='userMenu' id='userMenu' aria-controls='simple-menu' aria-haspopup='true' onClick={event => this.handleUserMenuClick(event)}>
          <PersonIcon style={{ color: sc.PRIMARY_COLOR, marginRight: 10 }} />
          <Typography variant='body2' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}><b>{this.props.userDetails.email}</b></Typography>
        </ButtonBase>
        <Menu
          id='simple-menu'
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={event => this.handleUserMenuClose()}
        >
          {/*
          <MenuItem onClick={() => console.log(this.props.userDetails)}>
            <PersonIcon style={{ color: sc.PRIMARY_COLOR, marginRight: 10, marginLeft: 10 }} />
            <Typography variant='body2' style={{ color: sc.SECONDARY_COLOR_DARK_2, marginRight: 30 }}>My account</Typography>
          </MenuItem>
          */}
          <MenuItem onClick={() =>
            this.props.authActions.logout(() => {
              this.handleUserMenuClose()
              this.handleLoginFormClose()
            })}
          >
            <Typography variant='body2' style={{ color: sc.SECONDARY_COLOR_DARK_2, marginRight: 30 }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    )
  }

  render () {
    const isAnon = firebaseAuth.currentUser ? firebaseAuth.currentUser.isAnonymous : true
    return (
      <div>
        <AppBar
          position={this.props.position} style={{
            background: 'white',
            boxShadow: 'none',
            height: sc.TOP_BAR_HEIGHT
          }}
        >
          <Toolbar>
            <Grid container justify='center'>
              <Grid style={{ flex: 1 }} />
              <Grid container justify='space-between' alignItems='center' style={{ flex: 4, maxWidth: 850 }}>
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
                      this.changePath('/about')
                    }}
                  >
                    <img alt='matchbox' src={logoText} style={{ height: 16 }} />
                  </MatchboxButton>
                  <Grid container justify='center'>
                    {this.props.match.url === '/about' && <HighlightLine />}
                  </Grid>
                </Grid>
                {this.renderButton('find property', '/')}
                {/* this.renderButton('admin', '/admin') */}
                {this.renderButton('industry', '/industry')}
                {this.renderButton('pricing', '/pricing')}
                {this.renderButton('contact us', '/contact-us')}
              </Grid>
              {isAnon ? this.renderLoginButton() : this.renderUserMenu()}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(TopNavigationBar)
