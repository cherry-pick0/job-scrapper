import type { Request, Response } from 'express'
import { getMainQueue } from '../../tasks/getMainQueue'

const scrapeLinkedInJobsController = async (req: Request, res: Response) => {
  try {
    // todo check if any action is in progress, and return 'already in progress' warning

    // Create action and send to queue
    const queue = await getMainQueue()
    await queue.add({
      task: 'scrapeLinkedInJobsTask',
      data: req.query
    })

    res.status(202).send({ message: 'Action accepted' })
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default scrapeLinkedInJobsController
