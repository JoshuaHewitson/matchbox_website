import {
  combineReducers
} from 'redux-immutable'

import UserReducer from './UserReducer'
import FeedReducer from './FeedReducer'
import FiltersReducer from './FiltersReducer'
import ListingDetailsReducer from './ListingDetailsReducer'
import AuthReducer from './AuthReducer'

export default combineReducers({
  user: UserReducer,
  feed: FeedReducer,
  filters: FiltersReducer,
  listingDetails: ListingDetailsReducer,
  auth: AuthReducer
})
