import { type Job, type ScrappedJobData, Site } from '../utils/types'
import fetchHtml from './utils/fetchHtml'

const parseHtml = (html: string): Job[] => {
  // todo parse html
  const mock: Job = { title: 'MockJob' }
  return [mock]
}

export const scrapeJobs = async (searchQuery: string): Promise<ScrappedJobData> => {
  const searchUrl = `https://www.linkedin.com/jobs/search?${searchQuery}`
  // todo fetch and parse real html
  const pageHtml = await fetchHtml(searchUrl)
  const results = parseHtml(pageHtml)
  const site = Site.LinkedIn

  return { searchParams: { site, searchQuery }, results }
}
