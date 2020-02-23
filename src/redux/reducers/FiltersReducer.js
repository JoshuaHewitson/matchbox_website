import * as types from '../actions/Types'
import { Record } from 'immutable'

const initialState = Record({
  loading: true,
  property_types: {
    houses: false,
    apartments: true
  },
  priceRange: [10000000, 25000000],
  price_min: 10000000,
  price_max: 25000000,
  bedrooms: ['any'],
  bathrooms: ['any'],
  suburb: 'green_point',
  suburbs: { green_point: true },
  blocks: {}
})

const filters = (state = initialState(), action) => {
  switch (action.type) {
    case types.SET_FILTERS:
      return state.merge(action.payload.filters)
    case types.SET_FILTERS_LOADING:
      return state.set('loading', action.payload.state)
    case types.SET_SUBURB:
      return state.set('suburb', action.payload.suburb)
    case types.SET_PRICE_RANGE:
      return state.set('priceRange', action.payload.priceRange)
    case types.SET_BEDROOMS:
      return state.set('bedrooms', action.payload.bedrooms)
    case types.SET_BATHROOMS:
      return state.set('bathrooms', action.payload.bathrooms)
    default: return state
  }
}
export default filters
