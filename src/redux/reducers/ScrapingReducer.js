import * as types from '../actions/Types'
import { Record } from 'immutable'

const initialState = Record({
  data: '',
  loading: false,
  loadingFailed: false
})

const scraping = (state = initialState(), action) => {
  switch (action.type) {
    case types.SET_SCRAPING_DATA:
      return state.set('data', action.payload.data)
    case types.SET_SCRAPING_DATA_LOADING:
      return state.set('loading', action.payload.loading)
    case types.SET_SCRAPING_DATA_LOADING_FAILED:
      return state.set('loadingFailed', action.payload.loadingFailed)
    default: return state
  }
}
export default scraping
