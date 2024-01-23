import { JSDOM } from 'jsdom'
import { type Job, type JobDetails } from '@src/utils/types'

export const parseSearchResultsHtml = async (htmlString: string): Promise<Job[]> => {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document

  const lis = document.querySelectorAll('li')
  const jobs: Job [] = []

  lis.forEach(async (li: any) => {
    const linkedInID = li.querySelector('div[data-entity-urn]').getAttribute('data-entity-urn').split(':').pop()
    const title = li.querySelector('.base-search-card__title')?.textContent.trim()
    const link = li.querySelector('.base-card__full-link')?.href
    const company = li.querySelector('.base-search-card__subtitle a')?.textContent.trim()
    const location = li.querySelector('.job-search-card__location')?.textContent.trim()
    const postingDate = li.querySelector('.job-search-card__listdate')?.getAttribute('datetime')

    jobs.push({ linkedInID, title, company, location, link, postingDate })
  })

  // return jobs
  return [jobs[0]]
}

export const parseJobDetailsHtml = async (htmlString: string): Promise<JobDetails> => {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document

  const contentDiv = document.querySelector('.show-more-less-html__markup')
  const textContent = contentDiv?.textContent ?? ''

  return { level: '', fullDescription: textContent }
}
