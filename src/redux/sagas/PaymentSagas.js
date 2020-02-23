import { all, put, select, call, takeLatest } from 'redux-saga/effects'

import * as types from '../actions/Types'
import {
  firebaseAuth,
  getNewSubscriptionDocRef,
  getNewPaymentDocRef,
  subscriptionRequestFunctionURL,
  paymentRequestFunctionURL
} from '../../services/Firebase'

import fetch from 'node-fetch'

function * sagaPayfastSubscription (action) {
  try {
    const userDetails = yield select((state) => state.get('user').details)
    // const subscriptionDocRef = getNewSubscriptionDocRef()
    const data = {
      name_first: userDetails.first_name,
      name_last: userDetails.last_name,
      email_address: userDetails.email,
      user_id: firebaseAuth.currentUser.uid,
      type: '150' // action.payload.type
      // m_payment_id: '8787876'
    }
    console.log(data)
    const response = yield fetch('https://us-central1-fire-matchbox.cloudfunctions.net/prop24Scraping', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify(data)
    })
    const payfastSubscriptionRequestURL = yield response.text()
    console.log(payfastSubscriptionRequestURL)
    // console.log('https://payfast.co.za/eng/process/?' + payfastSubscriptionRequestURL)

    // window.location.href = 'https://www.payfast.co.za/eng/process/?' + payfastSubscriptionRequestURL
  } catch (e) {
    console.log(e)
  }
}

/*
function * sagaPayfastPayment () {
  try {
    const userDetails = yield select((state) => state.get('user').details)
    const paymentDocRef = getNewPaymentDocRef()
    const data = {
      name_first: userDetails.first_name,
      name_last: userDetails.last_name,
      email_address: userDetails.email,
      user_id: firebaseAuth.currentUser.uid,
      m_payment_id: paymentDocRef.id
    }
    console.log(data)
    const response = yield fetch(paymentRequestFunctionURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const payfastPaymentRequestURL = yield response.text()
    console.log(payfastPaymentRequestURL)

    window.location.href = 'https://sandbox.payfast.co.za/eng/process/?' + payfastPaymentRequestURL
  } catch (e) {
    console.log(e)
  }
}
*/

export default function * watchers () {
  yield all([
    takeLatest(types.REQUEST_SUBSCRIPTION, sagaPayfastSubscription)
    // takeLatest(types.REQUEST_PAYMENT, sagaPayfastPayment)
  ])
}
