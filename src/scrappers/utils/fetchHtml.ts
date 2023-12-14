/* import puppeteer from 'puppeteer'

// todo optional: store puppeteer browser instances in cache or db
const fetchHtml = async (url: string, proxy?: string): Promise<string> => {
  // Open the headless browser
  const args = proxy ? [`--proxy-server=${proxy}`] : [] // todo handle proxy errors
  const browser = await puppeteer.launch({ headless: true, args })
  const page = await browser.newPage()

  // Fetch the page content
  await page.goto(url)
  const pageHtml = await page.content()

  // await page.screenshot({ path: 'example.png' })

  // Close the page and browser
  await page.close()
  await browser.close()
  console.log('Browser Closed')

  return pageHtml
} */

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
}

export default fetchHtml
