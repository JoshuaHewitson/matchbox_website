import { put, spawn, call, select, takeLatest, all } from 'redux-saga/effects'
// import { Google } from 'expo'
// import Constants from 'expo-constants'
// import * as Facebook from 'expo-facebook'
import firebase from 'firebase'

import * as types from '../actions/Types'
import {
  setUserDetails,
  setUserNewAnon,
  setUserDetailsLoading
} from '../actions/UserActions'
import {
  firebaseAuth,
  googleAuthProvider,
  getCurrentUserDocRef,
  getFiltersDocRef
} from '../../services/Firebase'
// import { sagaAddBuddyMatch } from './MatchesSagas'

import { loadFeed } from '../actions/FeedActions'
import { setFilters } from '../actions/FiltersActions'
import { sagaLoadFilters } from './FiltersSagas'

const newMBUserData = (
  firstName,
  lastName,
  email,
  emailVerified = false
) => ({
  is_annon_user: false,
  first_name: firstName,
  last_name: lastName,
  email: email,
  email_verified: emailVerified
})

function * sagaLogout () {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut])
    console.log('logout successful')
  } catch (e) {
    console.log('ERROR LOGGING OUT', e)
  }
}

const defaultFilters = {
  loading: true,
  property_types: {
    houses: false,
    apartments: true
  },
  priceRange: [5500000, 20000000],
  price_min: 5500000,
  price_max: 20000000,
  bedrooms: ['any'],
  bathrooms: ['any'],
  suburb: 'foreshore',
  suburbs: { foreshore: true },
  blocks: {}
}

function * sagaCreateAnonymousUser () {
  yield all([
    put(setUserNewAnon(true)),
    put(setFilters(defaultFilters))

  ])
  console.log(yield select((state) => state.get('user')))
  try {
    yield call([firebaseAuth, firebaseAuth.signInAnonymously])
  } catch (e) {
    console.log('ERR CREATING ANON USER', e)
  }

  // new user
  const userDataDB = {
    first_name: 'anon',
    last_name: 'user'
  }

  const userDataLocal = {
    first_name: 'anon',
    last_name: 'user',
    premium_user: false
  }

  // gotta create a new empty doc in the db
  const udbRef = getCurrentUserDocRef()
  yield all([
    yield call([udbRef, udbRef.set], userDataDB),
    yield put(setUserDetails(userDataLocal)),
    yield put(setUserNewAnon(true))
  ])

  try {
  // set DB filters
    const filtersDocRef = getFiltersDocRef('sales')
    const filters = yield select((state) => state.get('filters').toObject())
    yield call([filtersDocRef, filtersDocRef.set], filters)

    yield call(sagaLoadFilters)
    yield all([
      yield put(loadFeed()),
      yield put(setUserNewAnon(false))
    ])
  } catch (e) {
    console.log('CREATE FILTERS DOC ERR', e)
  }
}

function * sagaUserRegistration (action) {
  const { firstName, lastName, email, password } = action.payload
  var credential = firebase.auth.EmailAuthProvider.credential(email, password)
  // anon user already created - so just need to link
  try {
    yield call([firebaseAuth.currentUser, firebaseAuth.currentUser.linkWithCredential], credential)
    yield spawn(sagaCreateMatchboxUser, { firstName, lastName, email }, credential, action.onSuccess, action.onFail)
  } catch (e) {
    action.onFail(e)
    console.log('ERR LINKING CREDENTIALS', e)
  }
}

function * sagaGoogleLogin (action) {
  try {
    const response = yield call([firebaseAuth, firebaseAuth.signInWithPopup], googleAuthProvider)
    const udbRef = getCurrentUserDocRef()
    const doc = yield call([udbRef, udbRef.get])
    const names = response.user.displayName.split(' ')
    const firstName = names[0]
    const lastName = names[names.length - 1]
    console.log(names, names[names.length - 1])
    if (!doc.exists) {
      yield spawn(sagaCreateMatchboxUser,
        { firstName, lastName, email: response.user.email }, action.onSuccess, action.onFail)
    } else {
      yield put(setUserDetails(doc.data()))
      action.onSuccess()
    }
  } catch (e) {
    console.log('ERROR GOOGLE AUTH:', e)
    action.onFail(e)
  }
}

function * sagaCreateMatchboxUser (userData, onSuccess, onFail) {
  // user should already be logged into firebase - this funcion creates a user doc and filters etc on matchbox side
  const udbRef = getCurrentUserDocRef()
  // new user
  const data = newMBUserData(userData.firstName, userData.lastName, userData.email)
  yield call([udbRef, udbRef.set], data)
  yield put(setUserDetails(data))
  try {
    // set DB filters
    const filtersDocRef = getFiltersDocRef('sales')
    const filters = yield select((state) => state.get('filters').toObject())
    yield call([filtersDocRef, filtersDocRef.set], filters)
    onSuccess()
  } catch (e) {
    onFail(e)
    console.log('CREATE FILTERS DOC ERR', e)
  }
}

function * sagaEmailLogin (action) {
  yield put(setUserDetailsLoading(true))
  // extra data payload from action
  try {
    yield call(
      [firebaseAuth, firebaseAuth.signInWithEmailAndPassword],
      action.payload.email,
      action.payload.password
    )
    yield put(setUserDetails({ is_annon_user: false }))
    action.onSuccess()
  } catch (e) {
    action.onFail(e)
    console.log('ERR ON LOGIN', e)
  }
}

export default function * watchers () {
  yield all([
    takeLatest(types.AUTH_LOGOUT, sagaLogout),
    takeLatest(types.CREATE_ANONYMOUS_USER, sagaCreateAnonymousUser),
    takeLatest(types.AUTH_REGISTER, sagaUserRegistration),
    takeLatest(types.AUTH_EMAIL_LOGIN, sagaEmailLogin),
    takeLatest(types.AUTH_GOOGLE_LOGIN, sagaGoogleLogin)
  ])
}
