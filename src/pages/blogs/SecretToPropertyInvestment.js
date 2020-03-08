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
import img1 from '../../assets/18-year-cycle-2.jpg'
import img2 from '../../assets/18-year-cycle.png'

import { styleConstants as sc } from '../../config'
import testPic1 from '../../assets/testPic1.png'
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
              <Typography variant='h4' align='left' paragraph style={{ color: sc.SECONDARY_COLOR_DARK_2, fontWeight: 'bold' }}>
                    The secret to property invesment: The 18 year property cycle.
              </Typography>
            </div>
            <Typography paragraph variant='body2' style={{ color: sc.BODY_TEXT_COLOR }}>
                  If you think property is a great investment because the prices always go up, you’re kind of right. But it’s slightly more complicated than that. In the same way that the economy moves through cycles, the property market does too. It has ups and downs and never quite stays exactly the same. Before we get into the details of the 18 year property cycle, it is first important to understand why property prices go up and down over time. It’s essentially economics 101, but becomes a lot more obvious when we break it down. I’ve divided it into 5 bite sized chunks:
            </Typography>
            <Grid style={{ width: '100%' }}>
              <img alt='img1' src={img1} style={{ width: '100%', marginTop: 20, marginBottom: 20 }} />
            </Grid>
            <div>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              1. The amount of land available is mostly fixed (sure you can build a house in the middle of a field somewhere, but no one wants to do that and eventually that space will also run out). As the economy grows there is an increase in the demand for land and since supply is restricted, the price of land is pushed up.
              </Typography>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              2. Land prices increase faster than income increases, because the supply for certain high demand jobs can increase over time.
              </Typography>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              3. People start become more attracted to buying land and as a consequence they start speculating on the price. There are now two types of demands pushing up the price - the initial demand for actual land and the demand to due speculation on the price
              </Typography>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              4. As prices increase, mortgages are easier to obtain because the banks are confident that they will get more money on the return.
              </Typography>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              5. As prices increase, mortgages are easier to obtain because the banks are confident that they will get more money on the return.
              </Typography>
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              This process generally happens over the span of 18 years (on average) and has resulted in what we now see as the 18 year property cycle. The cycle is displayed in the graph below and goes through 4 phases.
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <img alt='img1' src={img2} style={{ width: '60%', marginTop: 20, marginBottom: 20 }} />
              </div>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>1. Recovery phase</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              It starts with the recovery phase right after a “crash” as described above. In this phase it’s difficult to get banks to lend you money and very few people are buying property, either because they don’t have the money or because they’re scared of what the market might do. It is during this time that your more experienced investors will start buying, because the potential yields are very high.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>2. Mid-cycle dip</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              People slowly start becoming more confident and start re-entering the property market. Banks start lending again and the economic hubs start seeing some growth. Early investors decide to take their money and sell, which causes confidence to take a knock. Doubt spreads due to the memory of the crash being fairly recent and the perception that experienced investors are pulling out.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>3. Explosive phase</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              Prices keep climbing and people regain their confidence. Big building projects start going up and the banks relax their lending standards. There is generally some media hype about the growth in the property market and claims about the prices growing ever higher are heard everywhere. This could cause some unlucky investors to fall victim to the so called “winner’s curse”, where they buy property at the end of this 7 year cycle, most likely in the last two years.
              </Typography>
              <Typography variant='subtitle1' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}>4. Recession phase</Typography>
              <br />
              <Typography variant='body2' paragraph style={{ color: sc.BODY_TEXT_COLOR }}>
              People start realizing that the high prices don’t make sense and aren’t willing to buy property at those rates. The prices start falling and over-leveraged investors go bankrupt, causing the banks to take losses (because the investors can’t pay back their loans and the property is worth less than what they borrowed against). Prices keep declining, but generally won’t drop quite as low as the previous 18 year cycle.
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
