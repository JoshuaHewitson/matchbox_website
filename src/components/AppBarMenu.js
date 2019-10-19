import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Menu, MenuItem } from '@material-ui/core'
import menuIcon from '../assets/menuIcon.svg'
import { styleConstants as sc } from '../config'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: sc.LIGHT_GREY
    },
    '&:hover': {
      backgroundColor: sc.LIGHT_GREY
    }
  }
}))(MenuItem)

const StyledIconButton = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: sc.LIGHT_GREY
    }
  }
}))(IconButton)

export default function AppBarMenu (props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid>
      <StyledIconButton onClick={handleClick}>
        <img src={menuIcon} style={{ height: 28 }} />
      </StyledIconButton>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          {props.renderButton('Looking for property', 1)}
        </StyledMenuItem>
        <StyledMenuItem>
          {props.renderButton('Request a buddy', 2)}
        </StyledMenuItem>
        <StyledMenuItem>
          {props.renderButton('Get verified', 3)}
        </StyledMenuItem>
        <StyledMenuItem>
          {props.renderButton('About Us', 4)}
        </StyledMenuItem>
        <StyledMenuItem>
          {props.renderButton('Contact', 5)}
        </StyledMenuItem>
      </StyledMenu>
    </Grid>
  )
}
