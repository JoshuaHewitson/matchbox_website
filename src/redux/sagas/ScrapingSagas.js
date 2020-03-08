import { put, call, takeLatest, all } from 'redux-saga/effects'
import * as types from '../actions/Types'
import {
} from '../actions/UserActions'
import {
} from '../../services/Firebase'

import fetch from 'node-fetch'
import rp from 'request-promise'
import { getPageHTML } from '../actions/ScrapingActions'

const cheerio = require('cheerio')

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/' // 'https://dry-crag-37488.herokuapp.com/'
const newURL = 'https://www.seeff.com/results/residential/for-sale/cape-town/green-point/house/44461/' // https://www.property24.com/for-sale/de-waterkant/cape-town/western-cape/9141/107085468

function * sagaGetPageHTML (action) {
  const html = yield rp(corsAnywhere + action.payload.url)
  console.log(html)
  const $ = cheerio.load(html)
  const numberData = $('#agent-number')
  const nameData = $('strong', '#sidebar-contact')
  const heading = $('#page-heading')[0].children[0].data
  const price = $('#heading-price')[0].children[0].data
  const nextURL = $('.top-nav-prev')
  const agent1 = {
    name: nameData[0].children[0].data,
    numbers: [numberData[0].children[0].data, numberData[0].children[2].data]
  }
  const house = { heading, price, agent1 }
  console.log(nextURL)
  // yield put(getPageHTML(newURL))
}

export default function * watchers () {
  yield takeLatest(types.GET_PAGE_HTML, sagaGetPageHTML)
}
