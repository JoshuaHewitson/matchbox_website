import { all } from 'redux-saga/effects'
import FiltersSagas from './FiltersSagas'
import FeedSagas from './FeedSagas'
import LoadDataSagas from './LoadDataSagas'

function * rootSaga () {
  yield all([
    LoadDataSagas(),
    FeedSagas(),
    FiltersSagas()
  ])
}

export default rootSaga
