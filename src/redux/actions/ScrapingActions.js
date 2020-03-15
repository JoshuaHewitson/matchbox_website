import * as types from './Types'

export const getPageHTML = (url) => ({
  type: types.GET_PAGE_HTML,
  payload: {
    url
  }
})

export const setScrapingData = (data) => ({
  type: types.SET_SCRAPING_DATA,
  payload: {
    data
  }
})

export const setScrapingLoading = (loading) => ({
  type: types.SET_SCRAPING_DATA_LOADING,
  payload: {
    loading
  }
})

export const setScrapingLoadingFailed = (loadingFailed) => ({
  type: types.SET_SCRAPING_DATA_LOADING_FAILED,
  payload: {
    loadingFailed
  }
})
