import React, { PureComponent } from 'react'
import { Grid, Typography, Link } from '@material-ui/core'

import {
  TextContainer,
  PageSection,
  ContentContainer,
  Footer,
  Step,
  HighlightLine
} from '../components'

import person2 from '../assets/person3.svg'

import { styleConstants as sc } from '../config'
import testPic1 from '../assets/testPic1.png'
import testPic2 from '../assets/testPic2.png'

// import heading from '../assets/heading.svg'

class Industry extends PureComponent {
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
                  <div style={{ marginBottom: 50 }}>
                    <Typography variant='h2' align='left' paragraph style={{ color: sc.SECONDARY_COLOR_DARK_2, maxWidth: 370 }}>
                    Articles:
                    </Typography>
                  </div>
                  <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <HighlightLine />
                  </div>
                  <div style={{ marginBottom: 80 }}>
                    <Typography variant='h6' align='left' paragraph style={{ color: sc.SECONDARY_COLOR_DARK_2, maxWidth: 370, fontWeight: 'bold' }}>
                      <Link href='/how-to-spot-a-great-investment' style={{ color: sc.SECONDARY_COLOR_DARK_2, cursor: 'pointer' }}>How to spot a great investment.</Link>
                    </Typography>
                  </div>

                  <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <HighlightLine />
                  </div>
                  <div style={{ marginBottom: 80 }}>
                    <Typography variant='h6' align='left' paragraph style={{ color: sc.SECONDARY_COLOR_DARK_2, maxWidth: 370, fontWeight: 'bold' }}>
                      <Link href='/the-secret-to-property-invesment-the-18-year-property-cycle' style={{ color: sc.SECONDARY_COLOR_DARK_2, cursor: 'pointer' }}>The secret to property invesment: The 18 year property cycle.</Link>
                    </Typography>
                  </div>

                  <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <HighlightLine />
                  </div>
                  <div style={{ marginBottom: 80 }}>
                    <Typography variant='h6' align='left' paragraph style={{ color: sc.SECONDARY_COLOR_DARK_2, maxWidth: 370, fontWeight: 'bold' }}>
                      <Link href='/foreigner-investing-in-south-africa-5-things-you-should-know' style={{ color: sc.SECONDARY_COLOR_DARK_2, cursor: 'pointer' }}>Foreigner investing in South Africa? 5 things you should know.</Link>
                    </Typography>
                  </div>

                </Grid>

              </TextContainer>
            </ContentContainer>
            <ContentContainer primary={false} width={this.props.width}>
              <Grid style={{ width: '80%' }}>
                <img class='appear' alt='img1' src={person2} style={{ marginTop: 20, marginBottom: 0 }} />
              </Grid>
            </ContentContainer>
          </PageSection>
        </Grid>
        <Footer width={this.props.width} />
      </div>
    )
  }
}

export default Industry
