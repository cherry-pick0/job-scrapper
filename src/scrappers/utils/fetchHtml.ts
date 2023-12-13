import puppeteer from 'puppeteer'

const fetchHtml = async (url: string, proxy?: string): Promise<string> => {
  // Open the headless browser
  const args = proxy ? [`--proxy-server=${proxy}`] : [] // todo handle proxy errors
  const browser = await puppeteer.launch({ headless: true, args })
  const page = await browser.newPage()

  // Fetch the page content
  await page.goto(url)
  const pageHtml = await page.content()

  await page.screenshot({ path: 'linkedin.png' })

  // Close the browser
  await browser.close()
  console.log('Browser Closed')

  return pageHtml
}

export default fetchHtml
