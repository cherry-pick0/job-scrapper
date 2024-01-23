import SearchRequestModel from '@src/db/models/SearchRequest'
import LinkedInJobModel from '@src/db/models/LinkedInJob'
import { fetchSearchResults, fetchJobDetails } from './fetchHtml'
import addLinkedInJob from '@src/services/addLinkedInJob'
import { parseSearchResultsHtml } from './parseHtml'
import { getLinkedInJobDetailsScrapQueue } from '@src/tasks/getLinkedInJobDetailsScrapQueue'

const queueJobDetailsScrap = async (jobId: string): Promise<void> => {
  const queue = await getLinkedInJobDetailsScrapQueue()
  await queue.add({ jobId }, { delay: 1000 })
}

export const scrapeLinkedInSearchResults = async (searchRequestId: string): Promise<void> => {
  const searchRequest = await SearchRequestModel.findById(searchRequestId)

  if (!searchRequest) {
    throw new Error('SearchRequest not found, scrapping failed')
  }
  // todo validate searchQuery
  // const searchUrl = `https://www.linkedin.com/jobs/search?${searchRequest.searchQuery}`
  const searchUrl = 'https://www.linkedin.com/jobs/search?keywords=Python%20Developer&location=United%20Kingdom&f_WT=2'
  // todo fetch and parse real html
  const searchResultsHtmlString = await fetchSearchResults(searchUrl)
  const jobs = await parseSearchResultsHtml(searchRequestId, searchResultsHtmlString)

  jobs.forEach(async (job) => {
    const { linkedInID, title, company, location, link, postingDate } = job
    const jobId = await addLinkedInJob(searchRequestId, { linkedInID, title, company, location, link, postingDate })
    await queueJobDetailsScrap(jobId)
  })
}

export const scrapeLinkedInJobDetails = async (jobId: string): Promise<void> => {
  const job = await LinkedInJobModel.findById(jobId)

  if (!job) {
    throw new Error('LinkedInJobModel not found, scrapping failed')
  }

  const jobLink = job.link

  if (!jobLink) {
    throw new Error('LinkedInJobModel link not found, scrapping failed')
  }

  const details = await fetchJobDetails(jobLink)
  console.log(details)
}
