import { put, call, takeLatest, all } from 'redux-saga/effects'

import * as types from '../actions/Types'
import { loadFeed } from '../actions/FeedActions'
import { sagaSetFilters } from './FiltersSagas'

function * sagaLoadDataSaga (action) {
  if (action.isAnonymous) {
    yield call(sagaSetFilters)
  } else {
    yield all([
      call(sagaSetFilters)
    ])
    yield put(loadFeed())
  }
}

export default function * watchers () {
  yield takeLatest(types.LOAD_APP_DATA, sagaLoadDataSaga)
}
