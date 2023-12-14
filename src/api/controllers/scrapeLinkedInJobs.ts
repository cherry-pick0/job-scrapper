import { scrapeJobs } from '@src/scrappers/jobs/linkedInScrapper'
import saveScrappedJobData from '@src/services/saveScrappedJobData'
import type { Request, Response } from 'express'

const scrapeLinkedInJobs = async (req: Request, res: Response) => {
  try {
    const result = await scrapeJobs(JSON.stringify(req.query))
    await saveScrappedJobData(result)
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default scrapeLinkedInJobs
