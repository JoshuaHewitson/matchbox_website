import * as types from '../actions/Types'
import { Record } from 'immutable'

const initialState = Record({
  details: {},
  loading: true,
  loadingFailed: false
})

const listingDetails = (state = initialState(), action) => {
  switch (action.type) {
    case types.SET_LISTING_DETAILS:
      return state.set('details', action.payload.details)
    case types.SET_LISTING_DETAILS_LOADING:
      return state.set('loading', action.payload.loading)
    case types.SET_LISTING_DETAILS_LOADING_FAILED:
      return state.set('loadingFailed', action.payload.loadingFailed)
    default: return state
  }
}
export default listingDetails
