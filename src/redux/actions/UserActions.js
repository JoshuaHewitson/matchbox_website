import * as types from './Types'

export const loadUserDetails = () => ({
  type: types.LOAD_USER_DETAILS
})

export const setUserDetails = (details) => ({
  type: types.SET_USER_DETAILS,
  payload: {
    details
  }
})

export const setUserNewAnon = (state) => ({
  type: types.SET_USER_NEW_ANON,
  payload: {
    state
  }
})

export const setUserDetailsLoading = (state) => ({
  type: types.SET_LISTING_DETAILS_LOADING,
  payload: {
    state
  }
})

export const setUserDetailsLoadingFailed = (state) => ({
  type: types.SET_LISTING_DETAILS_LOADING_FAILED,
  payload: {
    state
  }
})
