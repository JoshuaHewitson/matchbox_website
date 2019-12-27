import { call, takeLatest, all, put } from 'redux-saga/effects'
import * as types from '../actions/Types'
import { setFilters, setFiltersLoading } from '../actions/FiltersActions'
import { getFiltersDocRef, getAreasCollectionRef } from '../../services/Firebase'

const pareseDBFilters = (docs) => {
  var filters = docs[0].data()
  const suburbs = []
  const blocks = {}
  docs[1].forEach(doc => {
    suburbs.push(doc.id)
    blocks[doc.id] = doc.data().blocks
  })
  filters.suburb = Object.keys(filters.suburbs)[0]
  filters.suburbs = suburbs
  filters.blocks = blocks
  filters.priceRange = [filters.price_min, filters.price_max]
  console.log(filters)
  return filters
}

export function * sagaSetFilters () {
  try {
    yield put(setFiltersLoading(true))
    const filtersDocRef = getFiltersDocRef('sales')
    const areasDocRef = getAreasCollectionRef()
    const responses = yield all([
      call([filtersDocRef, filtersDocRef.get]),
      call([areasDocRef, areasDocRef.get])
    ])
    const filters = pareseDBFilters(responses)
    yield put(setFilters(filters))
    yield put(setFiltersLoading(false))
  } catch (e) {
    yield put(setFiltersLoading(false))
    console.log('ERR LOADING FILTERS', e)
  }
}

function * sagaSavePriceRangeToDB (action) {
  const update = { price_min: action.payload.priceRange[0], price_max: action.payload.priceRange[1] }
  const docRef = getFiltersDocRef('sales')
  yield call([docRef, docRef.update], update)
}

function * sagaSaveSuburbToDB (action) {
  const update = { suburb: action.payload.suburb, suburbs: { [action.payload.suburb]: true } }
  const docRef = getFiltersDocRef('sales')
  yield call([docRef, docRef.update], update)
}

function * sagaSaveBathroomsToDB (action) {
  const update = { bathrooms: action.payload.bathrooms }
  const docRef = getFiltersDocRef('sales')
  yield call([docRef, docRef.update], update)
}

function * sagaSaveBedroomsToDB (action) {
  const update = { bedrooms: action.payload.bedrooms }
  const docRef = getFiltersDocRef('sales')
  yield call([docRef, docRef.update], update)
}

export default function * watchers () {
  yield all([
    takeLatest(types.LOAD_FILTERS, sagaSetFilters),
    takeLatest(types.SET_SUBURB, sagaSaveSuburbToDB),
    takeLatest(types.SET_PRICE_RANGE, sagaSavePriceRangeToDB),
    takeLatest(types.SET_BATHROOMS, sagaSaveBathroomsToDB),
    takeLatest(types.SET_BEDROOMS, sagaSaveBedroomsToDB)
  ])
}
