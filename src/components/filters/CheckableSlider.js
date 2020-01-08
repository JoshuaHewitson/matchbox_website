import React from 'react'
import { styleConstants as sc, constants } from '../../config'
import { StyledSlider, StyledCheckBox } from '../StyledMaterialUI'
import { Grid, Typography, FormControlLabel } from '@material-ui/core'

const CheckableSlider = (props) => {
  return (
    <Grid style={{ flex: 1 }}>
      <Grid container justify='flex-end' alignItems='center' style={{ flex: 1 }}>
        <Grid>
          <FormControlLabel
            control={<StyledCheckBox checked={props.checked} onChange={(event, value) => props.handleChangeChecked(value)} value={props.CheckedValue} />}
            label={props.label}
          />
        </Grid>
        <Grid style={{ flex: 1, backgroundColor: sc.LIGHT_GREY, height: 1, margin: 10 }} />
        {props.children}
      </Grid>
      <div style={{ height: 10 }} />
      <StyledSlider
        value={props.sliderValue}
        onChange={(event, value) => props.handleChangeSlider(value)}
        {...props.sliderProps}
      />
    </Grid>
  )
}

export default CheckableSlider
