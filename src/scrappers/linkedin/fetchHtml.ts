import puppeteer from 'puppeteer'
import type { Page } from 'puppeteer'

const scrollPage = async (page: Page) => {
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      let totalHeight = 0
      let scrollCount = 0
      const maxScrolls = 2
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
  console.log('opening browser')
  const browser = await puppeteer.launch({ headless: false, args })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  // Go to url
  await page.goto(url)

  // Scroll to the bottom of the page
  await scrollPage(page)
  console.log('done scrolling')

  // Fetch the page content
  await page.content()

  // Wait for the jobs list to be loaded
  await page.waitForSelector('.jobs-search__results-list', { timeout: 2000 })

  // Fetch the HTML of the jobs list
  const pageHtml = await page.evaluate(() => {
    const jobsList = document.querySelector('.jobs-search__results-list')
    return jobsList ? jobsList.innerHTML : ''
  })
  // await page.screenshot({ path: 'fetchHtml.png' })

  // Close the page and browser
  // await new Promise(() => setTimeout(() => { console.log('done waiting') }, 2000))
  await page.close()
  await browser.close()
  console.log('Browser Closed')
  // Close the page and browser
  // await new Promise(() => setTimeout(() => { console.log('done waiting') }, 2000))

  return pageHtml
}
