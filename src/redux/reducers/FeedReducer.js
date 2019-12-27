import * as types from '../actions/Types'
import { Record } from 'immutable'

const initialState = Record({
  data: [],
  filtered_data: [],
  count: 0,
  loading: true,
  loading_failed: false
})

const feed = (state = initialState(), action) => {
  switch (action.type) {
    case types.SET_FEED_DATA:
      return state.set('data', action.payload.data)
    case types.SET_FEED_FILTERED_DATA:
      return state.set('filtered_data', action.payload.data)
    case types.SET_FEED_COUNT:
      return state.set('count', action.payload.count)
    case types.SET_FEED_LOADING:
      return state.set('loading', action.payload.feedState)
    case types.SET_FEED_LOADING_FAILED:
      return state.set('loading_failed', action.payload.feedState)
    case types.SET_BLOCK:
      var data = state.get('data').mergeDeep({ [action.payload.key]: { block: action.payload.block } })
      console.log(data.get(action.payload.key))
      // var newData = data.set(action.payload.key, data.get()).block = action.payload.block
      return state.set('data', data)
  }
  return state
}
export default feed
