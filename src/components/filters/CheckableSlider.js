import React from 'react'
import { styleConstants as sc, constants } from '../../config'
import { StyledSlider, StyledCheckBox, BootstrapTooltip } from '../StyledMaterialUI'
import { Grid, Typography, FormControlLabel } from '@material-ui/core'

const CheckableSlider = (props) => {
  return (
    <Grid style={{ flex: 1 }}>
      <BootstrapTooltip
        title={props.description === '' ? ''
          : <>
            <Typography>{props.label}</Typography>
            <em>{props.description}</em>
            {/*
          <Link color={sc.PRIMARY_COLOR} href='/'>
            <ui>read more</ui>
          </Link>
          */}
            </>}
      >
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
      </BootstrapTooltip>
      <div style={{ height: 10 }} />
      <StyledSlider
        value={props.sliderValue}
        onChange={(event, value) => props.handleChangeSlider(value)}
        {...props.sliderProps}
      />
    </Grid>
  )
}

CheckableSlider.defaultProps = {
  description: ''
}

export default CheckableSlider
