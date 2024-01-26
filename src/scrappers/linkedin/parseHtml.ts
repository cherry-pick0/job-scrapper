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

    if (!(linkedInID || title || link || company || location || postingDate)) return

    jobs.push({ linkedInID, title, company, location, link, postingDate })
  })

  return jobs
}

export const parseJobDetailsHtml = async (htmlString: string): Promise<JobDetails> => {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document

  const descriptionDiv = document.querySelector('.show-more-less-html__markup')
  const fullDescription = descriptionDiv?.textContent ?? ''

  // Find all <h3> elements
  const criteriaElements = document.querySelectorAll('h3.description__job-criteria-subheader')

  // Iterate through <h3> elements to find the one with "Seniority level" and get its corresponding <span> value
  let level = ''
  criteriaElements.forEach((criteria) => {
    if (criteria.textContent?.trim() === 'Seniority level') {
      const span = criteria.nextElementSibling
      if (span?.classList.contains('description__job-criteria-text')) {
        level = span.textContent?.trim() ?? ''
      }
    }
  })

  return { level, fullDescription }
}
