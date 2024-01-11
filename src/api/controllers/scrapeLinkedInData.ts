import { scrapeJobs } from '@src/scrappers/jobs/linkedInScrapper'
import saveScrappedJobData from '@src/services/saveScrappedJobData'
import type { Request, Response } from 'express'

const scrapeLinkedInJobsController = async (req: Request, res: Response) => {
  try {
    // check if any action is in progress, and return 'already in progress' warning

    // const result = await scrapeJobs(JSON.stringify(req.query))
    // await saveScrappedJobData(result)

    // Create action and send to queue
    res.status(202).send({ message: 'Action accepted' })
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default scrapeLinkedInJobsController
