import { put, call, takeLatest, all } from 'redux-saga/effects'
import * as types from '../actions/Types'
import {
  setUserDetails,
  setUserDetailsLoading,
  setUserDetailsLoadingFailed
} from '../actions/UserActions'
import {
  getCurrentUserDocRef,
  getCurrentUserMetaDocRef
} from '../../services/Firebase'

function * sagaLoadUserDetails () {
  yield put(setUserDetailsLoading(true))
  try {
    const udbRef = getCurrentUserDocRef()
    const udbMetaRef = getCurrentUserMetaDocRef()
    const docs = yield all([
      call([udbRef, udbRef.get]),
      call([udbMetaRef, udbMetaRef.get])
    ])
    if (docs[0].exists) {
      const ud = docs[0].data()
      ud.premium_user = false
      if (docs[1].exists) {
        if (docs[1].data().subscription_type === '150') ud.premium_user = true
      }
      yield put(setUserDetails(ud))
      console.log(ud)
      yield put(setUserDetailsLoading(false))
      yield put(setUserDetailsLoadingFailed(false))
    } else {
      yield put(setUserDetailsLoading(false))
      yield put(setUserDetailsLoadingFailed(true))
      console.log('ERR LOAD USER DETAILS: USER DOES NOT EXIST IN DB')
    }
  } catch (e) {
    yield put(setUserDetailsLoading(false))
    yield put(setUserDetailsLoadingFailed(true))
    console.log('ERR LOAD USER DETAILS: ', e)
  }
}

export default function * watchers () {
  yield takeLatest(types.LOAD_USER_DETAILS, sagaLoadUserDetails)
}
