import * as types from './Types'

export const loadFilters = () => ({
  type: types.LOAD_FILTERS
})

export const setFiltersLoading = (state) => ({
  type: types.SET_FILTERS_LOADING,
  payload: {
    state
  }
})

export const setFilters = (filters) => ({
  type: types.SET_FILTERS,
  payload: {
    filters
  }
})

export const setSuburb = (suburb) => ({
  type: types.SET_SUBURB,
  payload: {
    suburb
  }
})

export const setPriceRange = (priceRange) => ({
  type: types.SET_PRICE_RANGE,
  payload: {
    priceRange
  }
})

export const setBedrooms = (bedrooms) => ({
  type: types.SET_BEDROOMS,
  payload: {
    bedrooms
  }
})

export const setBathrooms = (bathrooms) => ({
  type: types.SET_BATHROOMS,
  payload: {
    bathrooms
  }
})
