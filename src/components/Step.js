import React from 'react'
import Typography from '@material-ui/core/Typography'
import { styleConstants as sc } from '../config'
import Grid from '@material-ui/core/Grid'

const Step = (props) => {
  return (
    <Grid container direction='row' style={{ borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
      {/* <Grid container justify='flex-start' alignItems='center' style={{ flex: 1 }}>
        <Grid style={{ boxShadow: '2px 2px 20px #2f8980', width: 80, height: 80, borderRadius: '50%' }}>
          <img src={props.image} style={{ width: '80%' }} />
        </Grid>
  </Grid> */}
      <Grid container justify='flex-start' alignItems='center' style={{ flex: 1 }}>
        <Typography variant='h4' align='left' style={{ fontWeight: 'bold', color: sc.PRIMARY_COLOR }}>
          {props.num}.
        </Typography>
      </Grid>
      <Grid style={{ flex: 4 }}>
        <Typography variant='subtitle1' align='left' paragraph style={{ maxWidth: 350, fontWeight: 'bold', color: sc.DARK_COLOR }}>
          {props.heading}
        </Typography>
        <Typography variant='body2' paragraph align='left' style={{ maxWidth: 350, color: sc.BODY_TEXT_COLOR }}>
          {props.paragraph1}
        </Typography>
        <Typography variant='body2' paragraph align='left' style={{ maxWidth: 350, color: sc.BODY_TEXT_COLOR }}>
          {props.paragraph2}
        </Typography>
      </Grid>
    </Grid>

  )
}

export default Step
