import * as types from '../actions/Types'
import { Record, List } from 'immutable'

const initialState = Record({
  loading: true,
  property_types: {
    houses: false,
    apartments: true
  },
  priceRange: [0, 20000000],
  bedrooms: ['any'],
  bathrooms: ['any'],
  suburb: '',
  suburbs: [],
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
  }
  return state
}
export default filters
