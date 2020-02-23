import React, { PureComponent } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { TopNavigationBar, TextContainer, HighlightLine, TopFiller, PageSection, ContentContainer } from '../components'

import { Price, IncludedItem } from '../components/FormatedText'

import person2 from '../assets/person3.svg'

import { styleConstants as sc } from '../config'

import heading from '../assets/heading.svg'

import {
  StyledSlider,
  StyledExpansionPanel,
  StyledExpansionPanelSummary
} from '../components/StyledMaterialUI'

class AboutUs extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      deposit_percentage: 0.25,
      interest_rate: 0.1,
      period: 20
    }
  }

  render () {
    return (
      <Grid container>
        <div style={{ width: '100%', height: 50 }} />
        <PageSection>
          <ContentContainer primary width={this.props.width}>
            <TextContainer>
              <Grid style={{ maxWidth: 400 }}>
                <div style={{ marginBottom: 20 }}>
                  <Typography variant='h6' align='left' paragraph style={{ maxWidth: 400, fontWeight: 'bold' }}>
            Contact us:
                  </Typography>
                </div>
                <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Want to know more? Have some feedback for us? We’d love to hear from you!
                </Typography>
                <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          Send an email our way - info@matchbox.app
                </Typography>
                {/*
                <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
          One of us loves doing admin, we promise we’ll reply!
                </Typography>
                */}
              </Grid>

            </TextContainer>
          </ContentContainer>
          <ContentContainer primary={false} width={this.props.width}>
            <Grid style={{ width: '80%' }}>
              <img class='appear' src={person2} style={{ marginTop: 20 }} />
            </Grid>
          </ContentContainer>
        </PageSection>
      </Grid>
    )
  }
}

export default AboutUs
