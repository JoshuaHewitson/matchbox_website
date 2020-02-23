import React from 'react'
import { Grid, Typography, FormControl, InputLabel, MenuItem, ListItemText } from '@material-ui/core'

import ScatterPlot from '../ScatterPlot'
import PriceSlider from './PriceSlider'

import { styleConstants as sc } from '../../config'

import { Price } from '../FormatedText'

import {
  StyledMenuItem,
  StyledCheckBox,
  StyledSelect,
  StyledMultipleSelect,
  StyledInput,
  StyledChip,
  GreyLinearProgress
} from '../StyledMaterialUI'

const graphSettings = {
  width: 400,
  height: 340,
  padding: 25,
  numDataPoints: 100
  // maxRange: () => Math.random() * 1000
}

const numRoomsOptions = ['any', '1', '2', '3', '4', '5', '6+']

const formatSuburb = (string = 'not set') => {
  return string.replace(/_/g, ' ').replace(/\b([a-z])/g, x => { return x.toUpperCase() })
}

const SelectSuburb = (props) => {
  return (
    <FormControl style={{ minWidth: 400 }}>
      <InputLabel id={props.selectId + 'label'}>{props.label}</InputLabel>
      <StyledSelect
        {...props.extraProps}
        labelId={props.selectId + 'label'}
        id='selectId'
        value={props.value}
        onChange={props.onChange}
      >
        {props.values.map(value => {
          return <MenuItem key={value} value={value}>{formatSuburb(value)}</MenuItem>
        })}
      </StyledSelect>
    </FormControl>
  )
}

const SelectMultipleRooms = (props) => {
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel id={props.selectId + 'label'}>{props.label}</InputLabel>
      <StyledMultipleSelect
        {...props.extraProps}
        labelId={props.selectId + 'label'}
        id='selectId'
        multiple
        value={props.value}
        onChange={props.onChange}
        input={<StyledInput />}
        // renderValue={selected => selected.join(', ')}
        renderValue={selected => (
          <div>
            {selected.map(value => (
              <StyledChip key={value} label={formatSuburb(value)} />
            ))}
          </div>
        )}
      >
        {props.values.map(value => {
          return (
            <StyledMenuItem key={value} value={value}>
              <StyledCheckBox checked={props.value.indexOf(value) > -1} />
              <ListItemText primary={formatSuburb(value)} />
            </StyledMenuItem>)
        })}
      </StyledMultipleSelect>
    </FormControl>
  )
}

const SearchFiltersTab = (props) => {
  return (
    <Grid>
      <Grid container flexDirection='row'>
        <Grid style={{ flex: 1 }}>
          <div style={{ height: 30 }} />
          <Typography paragraph variant='h4' style={{ color: sc.DARK_COLOR }}>
            {props.feedCount + ' results'}
          </Typography>
        </Grid>
      </Grid>
      {(props.filters.loading)
        ? <GreyLinearProgress variant='query' />
        : <SelectSuburb
          label='Suburb'
          name='suburb'
          values={props.filters.suburbs}
          value={props.filters.suburb}
          onChange={(event) => props.handleChangeSuburb(event.target.value)}
          selectId='suburbSelect'
        />}
      <div style={{ height: 70 }} />
      {
        (props.filters.loading)
          ? <GreyLinearProgress variant='query' />
          : <PriceSlider
            onChangeCommitted={(pricerange) => props.handleChangePriceRange(pricerange)}
            defaultValue={props.filters.priceRange}
          />
      }
      <div style={{ height: 10 }} />
      <Grid container flexDirection='row'>
        <Grid style={{ flex: 1, marginRight: 10 }}>
          <SelectMultipleRooms
            label='Bedrooms'
            name='bedrooms'
            values={numRoomsOptions}
            value={props.filters.bedrooms}
            onChange={(event) => props.handleChangeRooms('bedrooms', event.target.value)}
            selectId='bedroomsSelect'
          />
        </Grid>
        <Grid style={{ flex: 1 }}>
          <SelectMultipleRooms
            label='Bathrooms'
            name='bathrooms'
            values={numRoomsOptions}
            value={props.filters.bathrooms}
            onChange={(event) => props.handleChangeRooms('bathrooms', event.target.value)}
            selectId='bathroomsSelect'
          />
        </Grid>
      </Grid>
      <div style={{ height: 20 }} />
      <ScatterPlot
        data={props.scatterPlotData}
        xVal='price' yVal='floor_size'
        xLabel='Price in rands'
        yLabel='Floor size m²'
        selected={props.item.key}
        handleDotClick={(key) => props.handleScatterPlotDotClick(key)}
        {...graphSettings}
      />
      <div style={{ width: '100%', height: 30 }} />
      <Price
        display={props.premium_user}
        label='Average comp price'
        description='The average price of a similar property in this area'
        value={props.averagePrice}
        size='small'
      />
      <div style={{ width: '100%', height: 10 }} />
      <Price
        display={props.premium_user}
        label='Average price per m²'
        description='The average price of a square meter of property in this area'
        value={props.averagePPSM}
        size='small'
      />
      <div style={{ width: '100%', height: 10 }} />
      <Price
        display={props.premium_user}
        label='CMA valuation'
        description='Size of the property multiplied by the price per square meter in this area'
        value={props.averagePPSM * props.item.floor_size}
        size='medium'
      />
      <div style={{ width: '100%', height: 30 }} />
    </Grid>

  )
}

export default SearchFiltersTab
