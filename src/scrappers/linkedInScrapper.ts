import { type Job, type ScrappedJobData, Site } from '../utils/types'
import fetchHtml from './utils/fetchHtml'
import { JSDOM } from 'jsdom'

function parseHtml (htmlString: string) {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document

  const lis = document.querySelectorAll('li')
  const jobs: Job [] = []

  lis.forEach((li: any) => {
    const title = li.querySelector('.base-search-card__title')?.textContent.trim()
    const link = li.querySelector('.base-card__full-link')?.href
    const company = li.querySelector('.base-search-card__subtitle a')?.textContent.trim()
    const location = li.querySelector('.job-search-card__location')?.textContent.trim()
    const postingDate = li.querySelector('.job-search-card__listdate')?.textContent.trim()

    jobs.push({
      title,
      link,
      company,
      location,
      postingDate
    })
  })

  return jobs
}

export const scrapeJobs = async (searchQuery: string): Promise<ScrappedJobData> => {
  // const searchUrl = `https://www.linkedin.com/jobs/search?${searchQuery}`
  const searchUrl = 'https://www.linkedin.com/jobs/search'
  // todo fetch and parse real html
  const pageHtml = await fetchHtml(searchUrl)
  const results = parseHtml(pageHtml)
  const site = Site.LinkedIn

  return { searchParams: { site, searchQuery }, results }
}
