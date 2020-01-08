import * as types from './Types'

export const loadFeed = () => ({
  type: types.LOAD_FEED
})

export const setFeedData = (data) => ({
  type: types.SET_FEED_DATA,
  payload: {
    data
  }
})

export const setFeedFilteredData = (data) => ({
  type: types.SET_FEED_FILTERED_DATA,
  payload: {
    data
  }
})

export const setFeedLoading = (feedState) => ({
  type: types.SET_FEED_LOADING,
  payload: {
    feedState
  }
})

export const setFeedCount = (count) => ({
  type: types.SET_FEED_COUNT,
  payload: {
    count
  }
})

export const setFeedAveragePrice = (price) => ({
  type: types.SET_FEED_AVERAGE_PRICE,
  payload: {
    price
  }
})

export const setFeedAveragePPSM = (ppsm) => ({
  type: types.SET_FEED_AVERAGE_PPSM,
  payload: {
    ppsm
  }
})

export const filterFeedData = (priceRange, bedrooms, bathrooms) => ({
  type: types.FILTER_FEED_DATA,
  payload: {
    priceRange,
    bedrooms,
    bathrooms
  }
})

export const setBlock = (key, block) => ({
  type: types.SET_BLOCK,
  payload: {
    key,
    block
  }
})

export const setFiltersType = (type) => ({
  type: types.SET_FILTERS_TYPE,
  payload: {
    type
  }
})

export const setFiltersChanged = (feedState) => ({
  type: types.SET_FILTERS_CHANGED,
  payload: {
    feedState
  }
})

export const setFeedLoadingFailed = (feedState) => ({
  type: types.SET_FEED_LOADING_FAILED,
  payload: {
    feedState
  }
})
