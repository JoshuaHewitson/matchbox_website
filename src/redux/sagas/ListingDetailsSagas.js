import { put, call, takeLatest } from 'redux-saga/effects'
import * as types from '../actions/Types'
import {
  getListingDetailsDocRef
} from '../../services/Firebase'
import {
  setListingDetails,
  setListingDetailsLoading,
  setListingDetailsLoadingFailed
} from '../actions/ListingDetailsActions'

function * sagaLoadListingDetails (action) {
  var details = {}
  yield put(setListingDetails(details))
  yield put(setListingDetailsLoading(true))
  const docRef = getListingDetailsDocRef(action.payload.id)

  try {
    const response = yield call([docRef, docRef.get])
    details = response.data()
    yield put(setListingDetails(details))
    console.log(details)
    yield put(setListingDetailsLoading(false))
    yield put(setListingDetailsLoadingFailed(false))
  } catch (e) {
    yield put(setListingDetailsLoading(false))
    yield put(setListingDetailsLoadingFailed(true))
    console.log('LOAD LISTING DETAILS ERR', e)
  }
}

export default function * watchers () {
  yield takeLatest(types.LOAD_LISTING_DETAILS, sagaLoadListingDetails)
}
