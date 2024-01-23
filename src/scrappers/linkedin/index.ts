import SearchRequestModel from '@src/db/models/SearchRequest'
import { fetchSearchResults } from './fetchHtml'
import addLinkedInJob from '@src/services/addLinkedInJob'
import { parseSearchResultsHtml } from './parseHtml'

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
    await addLinkedInJob(searchRequestId, { linkedInID, title, company, location, link, postingDate })
  })
}

export const scrapeLinkedInJobDetails = async (jobId: string): Promise<void> => {
// todo
}
