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
import foreignInvestors from '../../assets/foreignInvestors.jpg'
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
            <div style={{ marginBottom: 40 }}>
              <Typography variant='h4' align='left' paragraph style={{ color: sc.SECONDARY_COLOR_DARK_2, fontWeight: 'bold' }}>
                    Foreigner investing in South Africa? 5 things you should know.
              </Typography>
            </div>
            <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
                  As a foreigner visiting South Africa and having experienced the breathtaking views and scenic coastline, you’re likely to consider buying property in the country. Whether it’s because you’d like a place of your own when coming back for holiday, or you want a good return on your investment, it’s important to make sure you have all the information you need about buying property in South Africa, before you make a decision.
            </Typography>
            <Grid style={{ width: '100%' }}>
              <img alt='img1' src={foreignInvestors} style={{ width: '100%', marginTop: 20, marginBottom: 20 }} />
            </Grid>
            <div>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>1. Land expropriation</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              Whilst many South Africans are taking the issue of land expropriation very seriously (as they rightly should), it is unlikely that much will change for the foreseeable future. The right to property is protected in the South African Constitution and may only be expropriated if adequate compensation is offered in return. As the law currently stands, the government has to essentially buy any property they expropriate and are unlikely to buy property in affluent areas.
              </Typography>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              Making headlines recently has been a draft bill that proposes an amendment to the Constitution, that would allow for expropriation without compensation. This has an eerie ring to it for foreigners thinking of buying property, but amending the constitution isn’t all that easy.  Here’s why:
              </Typography>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              a) The bill is only in its draft form and took over 20 years to get here
                <br /> <div style={{ marginLeft: 20 }}>i) Before a bill can be enforced, it has to go through numerous rounds of public submissions, redrafting and approval by the state organs. This is a long process that can take years.</div>
                <br /><br /> b) The bill has been opposed by both the DA and the EFF
                <br /> <div style={{ marginLeft: 20 }}>i) An amendment to the constitution requires a 66.6% majority in the National Assembly and 6/9 provinces from the National Committee of Provinces. You don’t need to understand the details, but the important thing is that the DA and the EFF holds more than 30% of the votes, making it unlikely that the requirements will be met.</div>
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>2. The economy</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              The South African economy has its ups and downs (literally), but has always been able to recover and bounce back. It took a dip in 1999 and then recovered nicely until being hit hard by the 2008 financial crisis. After that it recovered to its baseline level and withstood another knock in 2016 due to political turmoil and a looming drought. But once again it was a temporary slump, with the following year showing recovery in growth and increased political stability.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>3. Location matters</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              Anyone who has spent more than a few minutes with someone involved in the property industry will tell you this. In South Africa, the two best areas for buying property is the Western Cape and Gauteng. Especially in the Western Cape’s Atlantic Seaboard, property investment by foreigners are particularly popular, with over 17% of property sales being attributed to foreigners. With rental yields of between 6% and 8% in Cape Town, as well as a deprecation in the rand, buying property in the area is becoming more and more appealing. The views of the mountain and sea, combined with a wide array of tourist attractions in the area means that property is always in demand.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>4. The law is on your side</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              Non-residents can own property in South Africa without restriction and are subject to the same laws as South African nationals. Buying property is thus relatively easy, especially if you don’t require a bond to finance the purchase.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>5. Less is more (literally)</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              One bedroom and studio apartments return better yields than two and three bedroom apartments. This is because you can get higher rental and AirBnB rates for one bedroom apartments, proportional to two bedroom apartments. In GreenPoint, the average monthly rent on a one bedroom apartment is around R10 000, whereas the average rent for a two bedroom apartment is R16 000.  In terms of market value, the number of bedrooms in an apartment could almost double the sale price of a property, but won’t give you an equivalent return from rental rates. When buying to rent it’s important to make sure you know what your potential ROI is for both long term letting and short term (AirBNB style) letting. That’s why we show you all the available properties in the area and give you reports on all the properties + calculate your ROI for a specific listing - probably a good place to start!
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
