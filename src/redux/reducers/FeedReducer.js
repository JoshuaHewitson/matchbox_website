import * as types from '../actions/Types'
import { Record } from 'immutable'

const initialState = Record({
  data: [],
  filtered_data: [],
  selected_card: { price: 0, images: [{ src: '' }] },
  count: 0,
  average_price: 0,
  average_ppsm: 0,
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
    case types.SET_FEED_AVERAGE_PRICE:
      return state.set('average_price', action.payload.price)
    case types.SET_FEED_AVERAGE_PPSM:
      return state.set('average_ppsm', action.payload.ppsm)
    case types.SET_FEED_LOADING:
      return state.set('loading', action.payload.feedState)
    case types.SET_FEED_LOADING_FAILED:
      return state.set('loading_failed', action.payload.feedState)
    case types.SET_FEED_SELECTED_CARD:
      return state.set('selected_card', action.payload.card)
    case types.SET_BLOCK:
      var data = state.get('data').mergeDeep({ [action.payload.key]: { block: action.payload.block } })
      console.log(data.get(action.payload.key))
      // var newData = data.set(action.payload.key, data.get()).block = action.payload.block
      return state.set('data', data)
    default: return state
  }
}
export default feed
