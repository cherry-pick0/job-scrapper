import type { Request, Response } from 'express'
import { getLinkedInScrapQueue } from '@src/tasks/getLinkedInScrapQueue'

const scrapeLinkedInJobsController = async (req: Request, res: Response) => {
  try {
    const queue = await getLinkedInScrapQueue()
    const delayedTasks = await queue.getDelayedCount()

    if (delayedTasks > 0) {
      res.status(409).send({ message: 'Action already in progress' })
      return
    }

    // todo validate body params
    await queue.add(req.body, { delay: 2000 })

    res.status(202).send({ message: 'Action accepted' })
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default scrapeLinkedInJobsController
