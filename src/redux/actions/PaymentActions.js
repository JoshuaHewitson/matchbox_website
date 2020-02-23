import * as types from './Types'

export const requestSubscription = (type) => ({
  type: types.REQUEST_SUBSCRIPTION,
  payload: {
    type
  }
})

export const requestPayment = (type) => ({
  type: types.REQUEST_PAYMENT,
  payload: {
    type
  }
})
