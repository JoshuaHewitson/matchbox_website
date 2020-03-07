import * as types from './Types'

export const getPageHTML = (url) => ({
  type: types.GET_PAGE_HTML,
  payload: {
    url
  }
})
