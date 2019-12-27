import {
  combineReducers
} from 'redux-immutable'

import FeedReducer from './FeedReducer'
import FiltersReducer from './FiltersReducer'

export default combineReducers({
  feed: FeedReducer,
  filters: FiltersReducer
})
