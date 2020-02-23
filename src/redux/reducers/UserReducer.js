import * as types from '../actions/Types'
import { Record } from 'immutable'

const initialState = Record({
  details: {},
  new_anon: false,
  loading: true,
  loadingFailed: false
})

const user = (state = initialState(), action) => {
  console.log(state)
  switch (action.type) {
    case types.SET_USER_DETAILS:
      return state.set('details', action.payload.details)
    case types.SET_USER_NEW_ANON:
      return state.set('new_anon', action.payload.state)
    case types.SET_USER_DETAILS_LOADING:
      return state.set('loading', action.payload.loading)
    case types.SET_USER_DETAILS_LOADING_FAILED:
      return state.set('loadingFailed', action.payload.loadingFailed)
    default: return state
  }
}
export default user
