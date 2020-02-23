import React, { PureComponent } from 'react'
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Link,
  CircularProgress
} from '@material-ui/core'
import { styleConstants as sc } from '../config'

import { Divider } from '../components'

import { IncludedItem } from '../components/FormatedText'

import { BootstrapTooltip } from './StyledMaterialUI'
import PropertyProfileBar from './feed/PropertyProfileBar'
import sampleReport from '../assets/sample_report.png'
import '../App.css'

const FullInspectionReportOption = () => {
  return (
    <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, border: '1px solid rgb(47,230,166)', backgroundColor: 'white', borderRadius: 5, marginRight: 30, marginTop: 20, padding: 30 }}>
      <Grid container justify='center' alignItems='center'>
        <div style={{ width: '100%', height: 30 }} />
        <Typography variant='h6' style={{ marginRight: 30, color: sc.PRIMARY_COLOR }}>R</Typography>
        <Typography variant='h2' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}> 450</Typography>
        <Typography variant='h6' style={{ marginLeft: 30, color: sc.PRIMARY_COLOR }}>pm</Typography>
        <div style={{ width: '100%', height: 30 }} />
        <Divider />
        <div style={{ width: '100%', height: 30 }} />
        <IncludedItem
          label='Full access to calculators'
          description='Allows you to calculate income, costs, interest payments, profits and yields on any property'
          included
          size='small'
        />
        <div style={{ width: '100%', height: 10 }} />
        <IncludedItem
          label='Comparative market analysis'
          description='Allows you to see size and pricing of all other properties on the market + how it compares to the property you have selected.'
          included
          size='small'
        />
        <div style={{ width: '100%', height: 20 }} />
        <IncludedItem
          label='Individual property report'
          description={
            <>
                    See sample report
              <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                {' '} here.
              </Link>
            </>
          }
          included
          quantity={2}
          size='small'
        />
        <div style={{ width: '100%', height: 30 }} />
        <IncludedItem
          label='Individual property inspection'
          included
          quantity={2}
          description={
            <>
                  We send an analyst to do a physical inspection of the property and generate a full report. See sample report
              <Link underline='always' style={{ color: sc.PRIMARY_COLOR }} href='/'>
                {' '} here.
              </Link>
            </>
          }
          size='small'
        />
        <div style={{ width: '100%', height: 30 }} />
        <Divider />
        <div style={{ width: '100%', height: 30 }} />
        <Button
          style={{
            minWidth: 150,
            minHeight: 40,
            color: 'white',
            borderRadius: 20,
            paddingLeft: 20,
            paddingRight: 20,
            margin: 10,
            backgroundColor: sc.PRIMARY_COLOR
          }}
          onClick={() => {}}
        >
          BUY NOW
        </Button>
      </Grid>
    </Grid>
  )
}

class RequestReport extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      buttonLoading: false
    }
  }

  renderDataReportOption = () => {
    return (
      <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, backgroundColor: 'white', borderRadius: 5, marginRight: 30, marginTop: 20, padding: 30 }}>
        <Grid container justify='center' alignItems='center'>
          <div style={{ width: '100%', height: 30 }} />
          <Typography variant='h6' style={{ marginRight: 30, color: sc.PRIMARY_COLOR }}>R</Typography>
          <Typography variant='h2' style={{ color: sc.SECONDARY_COLOR_DARK_2 }}> 50</Typography>
          <Typography variant='h6' style={{ marginLeft: 30, color: sc.PRIMARY_COLOR }}> </Typography>
          <div style={{ width: '100%', height: 30 }} />
          <Divider />
          <div style={{ width: '100%', height: 30 }} />
          <IncludedItem
            label='Full access to calculators'
            description='Allows you to calculate income, costs, interest payments, profits and yields on any property'
            included size='small'
          />
          <div style={{ width: '100%', height: 10 }} />
          <IncludedItem
            label='Comparative market analysis'
            description='Allows you to see size and pricing of all other properties on the market + how it compares to the property you have selected.'
            included size='small'
          />
          <div style={{ width: '100%', height: 30 }} />
          <Divider />
          <div style={{ width: '100%', height: 30 }} />
          <Button
            style={{
              minWidth: 150,
              minHeight: 40,
              color: 'white',
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
              margin: 10,
              backgroundColor: sc.PRIMARY_COLOR
            }}
            onClick={() => {
              this.setState({ buttonLoading: true })
              this.props.requestPayment('50')
            }}
          >
            {this.state.buttonLoading ? <CircularProgress color='white' size={20} /> : 'BUY NOW'}
          </Button>
        </Grid>
      </Grid>
    )
  }

  render () {
    return (
      <div>
        <Dialog
          open={this.props.open}
          maxWidth='md'
          onClose={() => this.props.handleRequestReport(false)}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            <PropertyProfileBar item={this.props.item} handleBackButton={() => this.props.handleBackButton()} thumb={this.props.item.images[0].src} />
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            <Grid container flexDirection='row' justify='center' alignItems='flex-start'>
              <div style={{ padding: 20, paddingTop: 10 }}>
                <Typography variant='h2'>Data report</Typography>

                <Grid container justify='center' style={{ paddingTop: 20 }}>
                  {/*
                <Grid item xs={5}>
                  <Typography variant='body2'>Full inspection report</Typography>
                  <FullInspectionReportOption />
                </Grid> */}
                  <Grid container xs={4} justify='center' alignItems='flex-start'>
                    <Grid style={{ width: '100%' }}>
                      <BootstrapTooltip title='Click to view sample report'>
                        <Link target='_blank' href='https://firebasestorage.googleapis.com/v0/b/fire-matchbox.appspot.com/o/theRockwell_report.pdf?alt=media&token=b08b941d-12a9-4875-9aac-c464d94df25f'>
                          <img alt='sample report' style={{ width: '80%', marginLeft: 30 }} src={sampleReport} />
                        </Link>
                      </BootstrapTooltip>
                    </Grid>
                    <Button
                      textTransform='none'
                      style={{
                        color: 'white',
                        borderRadius: 2,
                        paddingLeft: 20,
                        paddingRight: 20,
                        backgroundColor: sc.SECONDARY_COLOR_DARK_2
                      }}
                      onClick={() => this.props.handleViewDetails(true, this.props.item.key)}
                    >Veiw sample report
                    </Button>
                  </Grid>
                  <Grid item xs={8} style={{ paddingLeft: 20, marginBottom: 50 }}>
                    {this.renderDataReportOption()}
                  </Grid>
                </Grid>

              </div>
            </Grid>
            {this.props.children}
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default RequestReport
