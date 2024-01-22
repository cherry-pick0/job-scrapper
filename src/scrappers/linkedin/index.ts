import { type Job, Site } from '@src/utils/types'
import LinkedInJobModel from '@src/db/models/LinkedInJob'
import SearchRequestModel from '@src/db/models/SearchRequest'
import fetchHtml from './fetchHtml'
import { JSDOM } from 'jsdom'

const parseHtml = async (searchRequestId: string, htmlString: string) => {
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

    const jobData = new LinkedInJobModel({ searchRequestId, linkedInID, title, company, location, link, postingDate })

    // Save the new object to the database
    await jobData.save()
      .then(doc => { console.log('Job saved:', doc) })
      .catch(err => { console.error('Error saving document:', err) })
  })

  return jobs
}

const scrapeJobs = async (searchRequestId: string): Promise<void> => {
  const searchRequest = await SearchRequestModel.findById(searchRequestId)

  if (!searchRequest) {
    throw new Error('SearchRequest not found, scrapping failed')
  }
  // todo validate searchQuery
  // const searchUrl = `https://www.linkedin.com/jobs/search?${searchRequest.searchQuery}`
  const searchUrl = 'https://www.linkedin.com/jobs/search?keywords=Python%20Developer&location=United%20Kingdom&f_WT=2'
  // todo fetch and parse real html
  const htmlString = await fetchHtml(searchUrl)
  await parseHtml(searchRequestId, htmlString)
}

export default scrapeJobs
