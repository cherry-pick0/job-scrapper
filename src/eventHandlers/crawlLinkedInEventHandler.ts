import { type Site } from '@src/utils/types'
import { scrapeJobs } from '@src/scrappers/jobs/linkedInScrapper'
import saveScrappedJobData from '@src/services/saveScrappedJobData'

type EventHandlerRequest = {
  site: Site
  searchQuery: string
}

const crawlLinkedInEventHandler = async (request: EventHandlerRequest) => {
  // const result = await scrapeJobs(JSON.stringify(request.searchQuery))
  // await saveScrappedJobData(result)
}
export default crawlLinkedInEventHandler
