import React from 'react'
import { styleConstants as sc } from '../config'
import { OrderedMap } from 'immutable'
import md5 from 'md5'

const createSignature = (data, passphrase) => {
  var s = ''
  const keys = data.keySeq()
  const values = data.valueSeq()
  for (var i = 0; i < data.size; i++) {
    const joinChar = i === data.size - 1 ? '' : '&'
    s += keys.get(i).replace(/\s/g, '+') + '=' + values.get(i).replace(/\s/g, '+') + joinChar
  }
  return md5(s.replace(/\s/g, '') + '&passphrase=' + passphrase)
}

const PaymentButton = (props) => {
  const data = OrderedMap({
    // Merchant details
    merchant_id: '10016068',
    merchant_key: 'kgs5hayfzunsn',
    return_url: encodeURIComponent('https://www.matchbox.app/return'),
    cancel_url: encodeURIComponent('https://www.matchbox.app/cancel'),
    notify_url: encodeURIComponent('https://us-central1-fire-matchbox.cloudfunctions.net/payFastTesting'),
    // Buyer details
    name_first: 'Joshua',
    name_last: 'Hewitson',
    email_address: encodeURIComponent('j32hewitson@gmail.com'),
    // Transaction details
    m_payment_id: '8542',
    amount: '100.00',
    item_name: 'Matchbox subscription',
    item_description: 'Subscrption to Matchbox software services',
    custom_int1: '9586',
    custom_str1: 'custom string here',

    email_confirmation: '1',
    confirmation_address: encodeURIComponent('j32hewitson@gmail.com'),

    payment_method: 'cc',

    subscription_type: '1',
    // billing_date: '2020-07-02',
    recurring_amount: '100.00',
    frequency: '3'
    // cycles: '12'
  })
  // createSignature(data)

  return (
    <div>
      <form action='https://us-central1-fire-matchbox.cloudfunctions.net/generatePaymentSubscriptionRequest' method='POST'>
        <input type='hidden' name='merchant_id' value={data.get('merchant_id')} />
        <input type='hidden' name='merchant_key' value={data.get('merchant_key')} />
        <input type='hidden' name='return_url' value={decodeURIComponent(data.get('return_url'))} />
        <input type='hidden' name='cancel_url' value={decodeURIComponent(data.get('cancel_url'))} />
        <input type='hidden' name='notify_url' value={decodeURIComponent(data.get('notify_url'))} />

        <input type='hidden' name='name_first' value={data.get('name_first')} />
        <input type='hidden' name='name_last' value={data.get('name_last')} />
        <input type='hidden' name='email_address' value={decodeURIComponent(data.get('email_address'))} />
        {/* <input type='hidden' name='cell_number' value='0823456789' /> */}

        <input type='hidden' name='m_payment_id' value={data.get('m_payment_id')} />
        <input type='hidden' name='amount' value={data.get('amount')} />
        <input type='hidden' name='item_name' value={data.get('item_name')} />
        <input type='hidden' name='item_description' value={data.get('item_description')} />
        <input type='hidden' name='custom_int1' value={data.get('custom_int1')} />
        <input type='hidden' name='custom_str1' value={data.get('custom_str1')} />

        <input type='hidden' name='email_confirmation' value={data.get('email_confirmation')} />
        <input type='hidden' name='confirmation_address' value={decodeURIComponent(data.get('confirmation_address'))} />

        <input type='hidden' name='payment_method' value={data.get('payment_method')} />

        <input type='hidden' name='subscription_type' value={data.get('subscription_type')} />
        {/* <input type='hidden' name='billing_date' value={data.billing_date} /> */}
        <input type='hidden' name='recurring_amount' value={data.get('recurring_amount')} />
        <input type='hidden' name='frequency' value={data.get('frequency')} />
        {/* <input type='hidden' name='cycles' value={data.cycles} /> */}

        <input type='hidden' name='signature' value={createSignature(data)} />
        <button type='submit' formmethod='post'>submit</button>

      </form>
      <button onClick={() => props.requestSubscription()}>test</button>
    </div>
  )
}

export default PaymentButton
