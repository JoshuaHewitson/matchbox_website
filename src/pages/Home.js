import React, { PureComponent } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {
  TopNavigationBar,
  TextContainer,
  HighlightLine,
  TopFiller,
  PageSection,
  ContentContainer,
  Footer
} from '../components'

import { Price, IncludedItem } from '../components/FormatedText'

import person2 from '../assets/person3.svg'

import { styleConstants as sc } from '../config'

import heading from '../assets/heading.svg'

import {
  StyledSlider,
  StyledExpansionPanel,
  StyledExpansionPanelSummary
} from '../components/StyledMaterialUI'

class Home extends PureComponent {
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
      <div>
        <Grid container>
          <div style={{ width: '100%', height: 50 }} />
          <PageSection>
            <ContentContainer primary width={this.props.width}>
              <TextContainer>
                <Grid style={{ maxWidth: 400 }}>
                  <img
                    style={{ height: 150 }}
                    alt='the smartest way to buy property'
                    src={heading}
                  />
                  <div style={{ height: 40 }} />
                  <div style={{ marginBottom: 40 }}>
                    <Typography variant='h6' align='left' paragraph style={{ color: sc.BODY_TEXT_COLOR, maxWidth: 370, fontWeight: 'bold' }}>
                  Providing you with the necessary tools to invest in the South African property market.
                    </Typography>
                  </div>
                  <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR, maxWidth: 360 }}>
                We aspire to bring you content, tools and give you access to a community that helps you make intelligent investment decisions. Our belief is that you should be able to gather data, analyse investment properties, learn valuable tips and become well-informed on the property market, all in one place. Matchbox is working hard to bring together real estate investors from all walks of life and from all levels of experience, to grow the South African property market and help more people attain financial freedom.
                  </Typography>
                  <div style={{ marginTop: 30, marginBottom: 20 }}>
                    <Typography variant='h6' align='left' paragraph style={{ maxWidth: 340, fontWeight: 'bold' }}>
                    Matchbox mission:
                    </Typography>
                  </div>
                  <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
                    Investing in real estate can be daunting and uncertain, but it can also be highly rewarding - giving you the financial freedom to pursue the things that you truly value. Our goal is to provide you with the tools you need to achieve that financial freedom. Whether you’re a seasoned property investor, just starting to grow your portfolio, or a first time home buyer - our mission is to make the process as easy as possible so that you can achieve your own success.
                  </Typography>
                </Grid>

              </TextContainer>
            </ContentContainer>
            <ContentContainer primary={false} width={this.props.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' src={person2} style={{ marginTop: 20, marginBottom: 250 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
        </Grid>
        <Footer width={this.props.width} />
      </div>
    )
  }
}

export default Home
