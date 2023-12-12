import { type Job } from '../utils/types'
import fetchHtml from '../utils/fetchHtml'

export const scrapeLinkedInJobs = async (): Promise<Job[]> => {
  const jobs: Job[] = []
  const searchUrl = `https://www.linkedin.com/jobs/search?keywords=${searchQuery}`
  const pageHtml = await fetchHtml(searchUrl)

  // todo: scrape jobs from linkedin
  console.log(pageHtml)

  return jobs
}
