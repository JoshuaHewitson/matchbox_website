import { put, call, takeLatest } from 'redux-saga/effects'

import * as types from '../actions/Types'
import { loadFeed } from '../actions/FeedActions'
import { sagaLoadFilters } from './FiltersSagas'
import { setUserNewAnon } from '../actions/UserActions'

function * sagaLoadDataSaga (action) {
  if (!action.newAnon) {
    yield call(sagaLoadFilters)
    yield put(loadFeed())
  }
  yield put(setUserNewAnon(false))
}

export default function * watchers () {
  yield takeLatest(types.LOAD_APP_DATA, sagaLoadDataSaga)
}
