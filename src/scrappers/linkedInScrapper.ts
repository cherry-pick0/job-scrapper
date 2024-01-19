import { type Job, type ScrappedJobData, Site } from '../utils/types'
import fetchHtml from './utils/fetchHtml'
import { JSDOM } from 'jsdom'

function parseJobs (htmlString: string) {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document

  const lis = document.querySelectorAll('li')
  const jobs: any [] = []

  lis.forEach((li: any) => {
    const jobTitle = li.querySelector('.base-search-card__title')?.textContent.trim()
    const jobLink = li.querySelector('.base-card__full-link')?.href
    const companyName = li.querySelector('.base-search-card__subtitle a')?.textContent.trim()
    const location = li.querySelector('.job-search-card__location')?.textContent.trim()
    const postingDate = li.querySelector('.job-search-card__listdate')?.textContent.trim()

    jobs.push({
      jobTitle,
      jobLink,
      companyName,
      location,
      postingDate
    })
  })

  return jobs
}

const parseHtml = (html: string): Job[] => {
  // todo parse html
  const mock: Job = { title: 'MockJob' }
  return [mock]
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
