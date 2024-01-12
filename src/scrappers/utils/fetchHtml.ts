import puppeteer from 'puppeteer'

// todo optional: store puppeteer browser instances in cache or db
const fetchHtml = async (url: string, proxy?: string): Promise<string> => {
  // Open the headless browser
  const args = proxy ? [`--proxy-server=${proxy}`] : [] // todo handle proxy errors
  const browser = await puppeteer.launch({ headless: true, args })
  const page = await browser.newPage()

  // Go to url
  await page.goto(url)

  // Scroll/click to see more jobs

  // Selector using aria-label
  /* const selector = 'button[aria-label="See more jobs"]'

  for (let i = 0; i < 3; i++) {
    // Check if the button is available and visible
    const buttonVisible = await page.evaluate(selector => {
      const btn = document.querySelector(selector)
      return btn
    }, selector)

    if (buttonVisible) {
      // Wait for the button to be loaded
      await page.waitForSelector(selector, { visible: true })

      // Click the button
      await page.click(selector)

      // Wait for necessary loading or navigation after the click
      // (e.g., page.waitForNavigation() or page.waitForTimeout())
    } else {
      // Break the loop if the button is not visible or not present
      break
    }

    // Optional: wait a bit between clicks to simulate user behavior or wait for content loading
    await new Promise(() => setTimeout(() => { console.log('done waiting') }, 1000))
  } */

  // Fetch the page content

  // Wait for the jobs list to be loaded
  const test = await page.content()
  console.log(test.length)

  await page.waitForSelector('.jobs-search__results-list', { timeout: 10000 })

  // Fetch the HTML of the jobs list
  const pageHtml = await page.evaluate(() => {
    const jobsList = document.querySelector('.jobs-search__results-list')
    return jobsList ? jobsList.innerHTML : ''
  })

  console.log(pageHtml)

  // await page.screenshot({ path: 'example.png' })

  // Close the page and browser
  await page.close()
  await browser.close()
  console.log('Browser Closed')

  return pageHtml
}

// mock html
/*
const fetchHtml = async (url: string): Promise<string> => {
  const mockHtml = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Job Listings</title>
  </head>
  <body>

      <h1>Job Listings</h1>

      <div class="job-listing">
          <h2 class="job-title">Software Engineer</h2>
          <p class="job-company">Company: TechCorp</p>
          <p class="job-location">Location: San Francisco, CA</p>
      </div>

      <div class="job-listing">
          <h2 class="job-title">Graphic Designer</h2>
          <p class="job-company">Company: CreativeStudio</p>
          <p class="job-location">Location: New York, NY</p>
      </div>
  </body>
  </html>
  `
  return mockHtml
} */

export default fetchHtml
