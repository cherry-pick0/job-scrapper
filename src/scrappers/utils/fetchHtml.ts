import puppeteer from 'puppeteer'

const fetchHtml = async (url: string): Promise<string> => {
  // Open the headless browser
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // Fetch the page content
  await page.goto(url)
  const pageHtml = await page.content()

  // Close the browser
  await browser.close()
  console.log('Browser Closed')

  return pageHtml
}

export default fetchHtml
