import { all } from 'redux-saga/effects'
import AuthSagas from './AuthSagas'
import UserSagas from './UserSagas'
import FiltersSagas from './FiltersSagas'
import FeedSagas from './FeedSagas'
import LoadDataSagas from './LoadDataSagas'
import ListingDetailsSagas from './ListingDetailsSagas'
import PaymentSagas from './PaymentSagas'

function * rootSaga () {
  yield all([
    AuthSagas(),
    UserSagas(),
    LoadDataSagas(),
    FeedSagas(),
    FiltersSagas(),
    ListingDetailsSagas(),
    PaymentSagas()
  ])
}

export default rootSaga
