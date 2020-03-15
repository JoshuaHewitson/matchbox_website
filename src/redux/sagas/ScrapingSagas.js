import { put, call, takeLatest, all } from 'redux-saga/effects'
import * as types from '../actions/Types'
import {
} from '../actions/UserActions'
import {
} from '../../services/Firebase'

import fetch from 'node-fetch'
import rp from 'request-promise'
import { getPageHTML, setScrapingData, setScrapingLoading } from '../actions/ScrapingActions'

const cheerio = require('cheerio')

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/' // 'https://dry-crag-37488.herokuapp.com/'
const newURL = 'https://www.seeff.com/results/residential/for-sale/cape-town/green-point/house/44461/' // https://www.property24.com/for-sale/de-waterkant/cape-town/western-cape/9141/107085468

const getListingData = (html) => {
  const $ = cheerio.load(html)
  const numberData = $('#agent-number')
  const nameData = $('strong', '#sidebar-contact')
  const heading = $('#page-heading')[0].children[0].data
  const price = $('#heading-price')[0].children[0].data
  const parts = $('script')[15].children[0].data.split('listing_gallery_images = [')
  const parts2 = parts[1].split('];')
  const imageData = parts2[0].split('},{')
  const images = []
  for (var i in imageData) {
    imageData[i] = imageData[i].replace(/\r?\n|\r|}|{|\s|"|\/\//g, '').split(',')
    images[i] = {}
    for (var j in imageData[i]) {
      const keyVal = imageData[i][j].split(':')
      images[i][keyVal[0]] = keyVal[1]
    }
    images[i] = { small: images[i].small, medium: images[i].normal, large: images[i].large }
  }
  const agent1 = {
    name: nameData[0].children[0].data,
    numbers: [numberData[0].children[0].data, numberData[0].children[2].data]
  }
  return { heading, price, agent1, images }
}

function * sagaGetPageHTML (action) {
  yield put(setScrapingLoading(true))
  // fetch front page data
  const html = yield rp(corsAnywhere + action.payload.url)
  // console.log(html)
  const $ = cheerio.load(html)

  // calc num pages
  const num = 2 // Math.ceil(Number($('.top-nav-counter')[0].children[0].data.split(' OF ')[1]) / 10)
  console.log(num)

  // fetch results from all pages
  var links = []
  var calls = []
  links[0] = corsAnywhere + action.payload.url
  calls.push(rp(links[0]))
  for (var i = 1; i < num; i++) {
    links[i] = corsAnywhere + action.payload.url + `/?p=${i + 1}`
    calls.push(rp(links[i]))
  }
  var responses = yield all(calls)

  // create data array
  var data = []
  for (i /* var j in responses */ = 0; i < 1; i++) {
    const $ = cheerio.load(responses[i])
    data.push(JSON.parse($('script')[0].children[0].data.replace(/\r?\n|\r/g, '')))
  }

  // call each individual listing page
  calls = []
  const items = []
  for (i in data) {
    for (var j /* in data[i].itemListElement */ = 0; j < 3; j++) {
      console.log(data[i].itemListElement[j].item.url)
      items.push(data[i].itemListElement[j].item)
      calls.push(rp(corsAnywhere + data[i].itemListElement[j].item.url))
    }
  }
  responses = yield all(calls)

  // get data from each page
  for (i in responses) {
    items[i] = { ...items[i], ...getListingData(responses[i]) }
  }

  console.log(items)
  yield put(setScrapingLoading(false))
  yield put(setScrapingData(items))

  // yield put(getPageHTML(newURL))
}

export default function * watchers () {
  yield takeLatest(types.GET_PAGE_HTML, sagaGetPageHTML)
}
