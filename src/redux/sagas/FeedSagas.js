import { call, takeLatest, all, select, put } from 'redux-saga/effects'

import * as types from '../actions/Types'
import {
  setFeedData,
  setFeedFilteredData,
  setFeedCount,
  setFeedLoading,
  setFeedLoadingFailed
} from '../actions/FeedActions'
import { getSingleSuburb, getListingDocRef } from '../../services/Firebase'
import { OrderedMap } from 'immutable'

const parseDBListing = (doc) => {
  return {
    ...doc.data(),
    key: doc.id
  }
}

const filterRooms = (numRooms, roomsOptions) => {
  for (var i = 0; i < roomsOptions.length; i++) {
    if (parseInt(numRooms) === parseInt(roomsOptions[i])) return true
  }
  return false
}

export const filterItem = (item, price, bedrooms, bathrooms) => {
  if (item.price <= price[0] || item.price >= price[1]) return false
  if (!(bedrooms.indexOf('any') > -1)) { if (!filterRooms(item.num_bedrooms, bedrooms)) return false }
  if (!(bathrooms.indexOf('any') > -1)) { if (!filterRooms(item.num_bathrooms, bathrooms)) return false }
  return true
}

function * sagaLoadSearchResults () {
  const data = {}
  const filteredData = []
  var count = 0
  const filters = yield select((state) => state.get('filters'))
  try {
    yield put(setFeedLoading(true))
    const query = getSingleSuburb(filters.suburb)
    const responses = yield call([query, query.get])
    responses.forEach(doc => {
      const item = parseDBListing(doc)
      data[doc.id] = item
      if (filterItem(item, filters.priceRange, filters.bedrooms, filters.bathrooms)) {
        filteredData.push(item)
        count++
      }
    })
    yield put(setFeedData(OrderedMap(data)))
    yield put(setFeedFilteredData(filteredData))
    yield put(setFeedCount(count))
    yield put(setFeedLoading(false))
  } catch (e) {
    yield put(setFeedLoading(false))
    yield put(setFeedLoadingFailed(true))
    console.log('ERR LOADING FEED', e)
  }
}

function * sagaFilterData (action) {
  const filteredData = {}
  var count = 0
  const data = yield select((state) => state.get('feed').data)
  const { priceRange, bedrooms, bathrooms } = action.payload
  for (var i = 0; i < data.size; i++) {
    const item = data.valueSeq().get(i)
    if (item, priceRange, bedrooms, bathrooms) {
      filteredData.push(item)
      count++
    }
  }
  yield put(setFeedCount(count))
  yield put(setFeedFilteredData(filteredData))
}

function * sagaSetBlock (action) {
  const update = { block: action.payload.block }
  const docRef = getListingDocRef(action.payload.key)
  yield call([docRef, docRef.update], update)
}

export default function * watchers () {
  yield all([
    takeLatest(types.LOAD_FEED, sagaLoadSearchResults),
    takeLatest(types.FILTER_FEED_DATA, sagaFilterData),
    takeLatest(types.SET_BLOCK, sagaSetBlock)
  ])
}
