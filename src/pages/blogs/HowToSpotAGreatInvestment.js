import React, { PureComponent } from 'react'
import { Grid, Typography } from '@material-ui/core'

import {
  TextContainer,
  PageSection,
  ContentContainer,
  Footer,
  Step,
  HighlightLine
} from '../../components'

import person2 from '../../assets/person3.svg'

import { styleConstants as sc } from '../../config'
import greatInvestment from '../../assets/greatInvestment.png'
import testPic2 from '../../assets/testPic2.png'

// import heading from '../assets/heading.svg'

class Index extends PureComponent {
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
            <div style={{ marginBottom: 20, marginTop: 20 }}>
              <HighlightLine />
            </div>
            <div style={{ marginBottom: 40, width: '100%' }}>
              <Typography variant='h4' paragraph style={{ color: sc.SECONDARY_COLOR_DARK_2, fontWeight: 'bold' }}>
                    How to spot a great investment.
              </Typography>
            </div>
            <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
                  Starting your property investment journey can be scary, and it should be - because the stakes are high. If you take out a mortgage on a bad investment, you’re stuck with the monthly bond payments for the next 10-20 years and you can end up losing a lot of money at the end of the day. Doing proper research, making sure you’ve calculated the best and worst case yield scenarios, and looking at comparable properties is essential when deciding whether a property is a good investment.
            </Typography>
            <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
                  No one can tell you when you’ve done enough homework - you need to feel comfortable with the decision you're making. However, it is important to make sure that you have at the minimum, considered the following factors:
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <img alt='img1' src={greatInvestment} style={{ width: '80%', marginTop: 20, marginBottom: 20 }} />
            </div>
            <div>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>1. Location</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
                Location, location, location. It sounds cliche, but it’s because it’s true. The first step in deciding on a property, is to decide where you want to buy. It is important to take different considerations into account, such as the distance from where you stay and how well you know the area. Ideally you want to be able to go to the property relatively quickly if something goes wrong with a tenant or renovations.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>2. Growth</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              If you’re planning on keeping the property for more than two or three years, it’s important to look at the predicted growth in price for the area and the specific property. You don’t want to find yourself in a situation where you urgently need cash and are forced to sell the property for less than what you bought it for.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>3. Yield</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              Yields are that which you get back from putting money/effort/time into an investment. There are several yield calculations that you should do for each property you consider, but the most important ones are the gross yield and the nett yield. Gross yield is calculated by dividing your annual income from the property by the price you paid for the property. To calculate the net yield, you subtract your costs related to the property from the income you make out of it, before dividing it by the price you paid for it. There are several useful tools that you can use to make these (and other important calculations) easy.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>4. Rental prices</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              Although rental prices aren’t always completely in line with sale prices, they give a good indication of the type of area the property is in and can be used to determine what a reasonable sale price in the area should be. It is also important to take this into consideration if you’re buying a property with the intention of letting it out. Rental prices in the area will give you a good indication of what you can expect to make on the property.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>5. Sale price</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              It seems obvious that you should take the sale price into account, but what isn’t obvious is that even if you can afford a bigger, more expensive property it’s not always the best idea to buy it. The higher the price of a property, the longer it takes to sell - so if you want to get your cash out further down the line it might take a lot longer than expected.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>6. Infrastructure in the area</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              The infrastructure in and around a certain area can tell you a lot about how the property prices will fare in a few years time. New businesses opening up, lots of opportunity/space for road expansion and amenities like shops, schools and gyms in the area are generally good signs that the area is doing well.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>7. Comparable properties and cap rates</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              The infrastructure in and around a certain area can tell you a lot about how the property prices will fare in a few years time. New businesses opening up, lots of opportunity/space for road expansion and amenities like shops, schools and gyms in the area are generally good signs that the area is doing well.
              </Typography>
            </div>
          </PageSection>
        </Grid>
        <Footer width={this.props.width} />
      </div>
    )
  }
}

export default Index
