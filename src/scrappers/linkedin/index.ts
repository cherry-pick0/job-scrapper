import SearchRequestModel from '@src/db/models/SearchRequest'
import LinkedInJobModel from '@src/db/models/LinkedInJob'
import { fetchSearchResults, fetchJobDetails } from './fetchHtml'
import addLinkedInJob from '@src/services/addLinkedInJob'
import { parseSearchResultsHtml, parseJobDetailsHtml } from './parseHtml'
import scrapLinkedInJobDetailsQueue from '@src/tasks/scrapLinkedInJobDetailsQueue'
import addLinkedInJobDetails from '@src/services/addLinkedInJobDetails'
import updateSearchRequestStatus from '@src/services/updateSearchRequestStatus'

const queueJobDetailsScrap = async (jobId: string): Promise<void> => {
  const jobDetailsQueue = await scrapLinkedInJobDetailsQueue()
  await jobDetailsQueue.add({ jobId }, { delay: 1000 })
}

export const scrapeLinkedInSearchResults = async (searchRequestId: string): Promise<void> => {
  const searchRequest = await SearchRequestModel.findById(searchRequestId)

  if (!searchRequest) {
    throw new Error('SearchRequest not found, scrapping failed')
  }

  // update status
  await updateSearchRequestStatus(searchRequestId, 'In progress')

  try {
    // todo validate search request parameters
    const { location, position } = searchRequest.searchParams
    // remote => 'f_WT=2'
    // levelMidSenior => 'f_E=4'
    const searchUrl = `https://www.linkedin.com/jobs/search?keywords=${position}&location=${location}&f_WT=2&f_E=4`

    const searchResultsHtmlString = await fetchSearchResults(searchUrl)
    const jobs = await parseSearchResultsHtml(searchResultsHtmlString)

    jobs.forEach(async (job) => {
      try {
        const { linkedInID, title, company, location, link, postingDate } = job
        const jobId = await addLinkedInJob(searchRequestId, { linkedInID, title, company, location, link, postingDate })
        await queueJobDetailsScrap(jobId)
      } catch (e) {
      // todo handle error
        console.log(e)
      }
    })

    await updateSearchRequestStatus(searchRequestId, 'Completed')
  } catch (error) {
    await updateSearchRequestStatus(searchRequestId, 'Error', error?.toString())
  }
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

  const htmlString = await fetchJobDetails(jobLink)
  const details = await parseJobDetailsHtml(htmlString)
  await addLinkedInJobDetails(jobId, details)
}
