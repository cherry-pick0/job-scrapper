import puppeteer from 'puppeteer'
import type { Page } from 'puppeteer'

const scrollPage = async (page: Page) => {
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      let totalHeight = 0
      let scrollCount = 0
      const maxScrolls = 5
      const distance = 100 // should be less than or equal to window.innerHeight
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        scrollCount++

        if (scrollCount >= maxScrolls || totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 3000)
    })
  })
}

// todo optional: store puppeteer browser instances in cache or db
export const fetchSearchResults = async (url: string, proxy?: string): Promise<string> => {
  // wait a little before opening the browser
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Open the headless browser
  const args = proxy ? [`--proxy-server=${proxy}`] : [] // todo handle proxy errors
  console.log('Opening browser')
  const browser = await puppeteer.launch({ headless: true, args })
  const page = await browser.newPage()
  page.on('error', (err) => { console.log('Page error ', err) })
  await page.setViewport({ width: 1280, height: 800 })

  // Go to url
  await page.goto(url)

  // Scroll to the bottom of the page
  await scrollPage(page)
  console.log('Done scrolling')

  // Fetch the page content
  await page.content()

  // Wait for the jobs list to be loaded
  await page.waitForSelector('.jobs-search__results-list', { timeout: 2000 }).catch(async () => {
    await browser.close()
    console.log('Browser Closed')
    throw Error('Selector results-list not found')
  })

  // Fetch the HTML of the jobs list
  const pageHtml = await page.evaluate(() => {
    const jobsList = document.querySelector('.jobs-search__results-list')
    return jobsList ? jobsList.innerHTML : ''
  })
  // await page.screenshot({ path: 'fetchHtml.png' })

  // Close the page and browser
  await page.close()
  await browser.close()
  console.log('Browser Closed')

  return pageHtml
}

export const fetchJobDetails = async (url: string, proxy?: string): Promise<string> => {
  // wait a little before opening the browser
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Open the headless browser
  const args = proxy ? [`--proxy-server=${proxy}`] : [] // todo handle proxy errors
  console.log('Opening browser')
  const browser = await puppeteer.launch({ headless: true, args })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  // Go to url
  await page.goto(url)

  // Fetch the page content
  await page.content()
  console.log('Done fetching content')

  // Wait for the job details to be loaded
  await page.waitForSelector('.description', { timeout: 2000 }).catch(async () => {
    await browser.close()
    console.log('Browser Closed')
    throw Error('Selector .description not found')
  })

  const pageHtml = await page.evaluate(() => {
    const jobDetails = document.querySelector('.description')
    return jobDetails ? jobDetails.innerHTML : ''
  })

  // Close the page and browser
  await new Promise(resolve => setTimeout(resolve, 1000))
  await page.close()
  await browser.close()
  console.log('Browser Closed')

  return pageHtml
}
