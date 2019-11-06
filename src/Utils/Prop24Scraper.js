const scrape = () => {
  const showEmail = document.getElementById('P24_ToggleAgentEmailLink')
  const showNumber = document.getElementById('P24_ToggleAgentNumbersLink')
  const readMore = document.querySelector('a[title="Read More"]')
  let nextClicks = 0
  let nextClickInterval = null
  const showEmailAndThenShowNumber = () => {
    if (showEmail) showEmail.click()
    setTimeout(showNumberAndThenReadMore, 3000)
  }

  const showNumberAndThenReadMore = () => {
    if (showNumber) showNumber.click()
    setTimeout(readMoreAndThenBeginClicks, 3000)
  }

  const readMoreAndThenBeginClicks = () => {
    if (readMore) readMore.click()

    nextClickInterval = setInterval(clickImageNext, 200)
  }

  const clickImageNext = () => {
    document.querySelector('.p24_next').click()
    nextClicks++
    if (nextClicks > 10) {
      clearInterval(nextClickInterval)
      setTimeout(getAllDetails, 1000)
    }
  }

  const defaultElement = { innerText: '' }

  const getAllDetails = () => {
    const agentNumbers = []
    const images = []
    const title = document.querySelector('h1').innerText
    const price = document.querySelector('.panel-body .p24_price').innerText.replace(/(R|\s)/g, '').trim()
    const agentName = (document.querySelector('.js-P24_AgentName') || defaultElement).innerText
    const agentEmail = (document.querySelector('.js-P24_Email') || defaultElement).innerText;
    (document.querySelectorAll('.p24_sidebarAgentContactNumber') || []).forEach(number => agentNumbers.push(number.innerText.trim()))
    // const location = document.querySelector('pull-left').innerText.trim()
    // console.log(location)
    const bedrooms = (document.querySelector('li[title="Bedrooms"]') || defaultElement).innerText.trim()
    const bathrooms = (document.querySelector('li[title="Bathrooms"]') || defaultElement).innerText.trim()
    if (bedrooms === '') console.log('no bedrooms')
    if (bedrooms === '') console.log('no bathrooms')
    const floorSize = (document.querySelector('li[title="Floor Size"]') || defaultElement).innerText.replace(/(m|²)/g, '').trim()
    const description = (document.querySelector('.js_readMoreText') || defaultElement).innerText
    document.querySelectorAll('#main-gallery a.js_lightboxImageSrc').forEach(image => {
      // console.log(imageArr[0])
      images.push({ src: image.dataset.src })
    })
    /*
    document.querySelectorAll('#main-gallery img.js_lazyImageLoading').forEach(image => {
      console.dir(image)
      images.push({ src: image.dataset.src })
    }) */
    const data = {
      title,
      price,
      agentName,
      agentEmail,
      agentNumbers,
      bedrooms,
      bathrooms,
      floorSize,
      description,
      images
    }

    console.log(JSON.stringify(data, null, 2))
    /*
    const xhr = new XMLHttpRequest()
    const url = 'https://jsonplaceholder.typicode.com/posts' // TODO: replace with firebase endpoint
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log('INFO SENT')
      }
    }

    xhr.send(JSON.stringify(data))
    */
  }

  showEmailAndThenShowNumber()
}
scrape()
