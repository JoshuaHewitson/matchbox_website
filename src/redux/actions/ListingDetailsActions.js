import * as types from './Types'

export const loadListingDetails = (id) => ({
  type: types.LOAD_LISTING_DETAILS,
  payload: {
    id
  }
})

export const setListingDetails = (details) => ({
  type: types.SET_LISTING_DETAILS,
  payload: {
    details
  }
})

export const setListingDetailsLoading = (state) => ({
  type: types.SET_LISTING_DETAILS_LOADING,
  payload: {
    state
  }
})

export const setListingDetailsLoadingFailed = (state) => ({
  type: types.SET_LISTING_DETAILS_LOADING_FAILED,
  payload: {
    state
  }
})
