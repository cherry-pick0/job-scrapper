import type { Request, Response } from 'express'
import { getLinkedInScrapQueue } from '@src/tasks/getLinkedInScrapQueue'
import saveSearchRequest from '@src/services/saveSearchRequest'
import { Site } from '@src/utils/types'

const scrapeLinkedInJobsController = async (req: Request, res: Response) => {
  try {
    const queue = await getLinkedInScrapQueue()
    const delayedTasks = await queue.getDelayedCount()

    if (delayedTasks > 0) {
      res.status(409).send({ message: 'Action already in progress' })
      return
    }

    // todo validate body params
    // Save search request
    const searchRequestId = await saveSearchRequest({ searchQuery: req.body, site: Site.LinkedIn })
    await queue.add({ searchRequestId }, { delay: 1000 })

    res.status(202).send({ message: 'Action accepted' })
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default scrapeLinkedInJobsController
