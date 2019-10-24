import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import PageSection from './PageSection'
import ContentContainer from './ContentContainer'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { styleConstants as sc } from '../config'
import TextContainer from './TextContainer'

const changePath = (props, path) => {
  window.scrollTo(0, 0)
  props.history.push(path)
}

const FooterButton = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    color: sc.BODY_TEXT_COLOR,
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.05)'
    }
  }
}))(Button)

const FooterButtonHidden = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    color: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.05)'
    }
  }
}))(Button)

const Footer = (props) => {
  return (
    <div style={{ backgroundColor: sc.LIGHT_GREY }}>
      <PageSection>
        <ContentContainer primary width={props.width}>
          <Grid container style={{ marginTop: 50, paddingLeft: 50 }}>
            <Grid container>
              <FooterButton onClick={() => changePath(props, '/')}>
              Home
              </FooterButton>
            </Grid>
            <Grid container>
              <FooterButton onClick={() => changePath(props, '/privacy_policy')}>
              Privacy policy
              </FooterButton>
            </Grid>
            <Grid container>
              <FooterButton onClick={() => changePath(props, '/terms_of_use')}>
              Terms of use
              </FooterButton>
            </Grid>
            <Grid container>
              <FooterButtonHidden onClick={() => changePath(props, '/post_listing')}>
              Post listing
              </FooterButtonHidden>
            </Grid>
          </Grid>
        </ContentContainer>
        <ContentContainer primary width={props.width}>
          <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>
            info@matchbox.app
          </Typography>
        </ContentContainer>
      </PageSection>
      <Grid container justify='center' alignItems='flex-end' style={{ height: '100%', padding: 20 }}>
        <Typography variant='caption' style={{ color: sc.BODY_TEXT_COLOR }}>Copyright © 2019 Matchbox Holdings (PTY) Ltd. All rights reserved.</Typography>
      </Grid>
    </div>
  )
}

export default withRouter(Footer)
