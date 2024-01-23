import type { Request, Response } from 'express'
import getScrappedLinkedJobs from '@src/services/getScrappedLinkedJobs'

const getScrappedLinkedInJobsController = async (req: Request, res: Response) => {
  try {
    const result = await getScrappedLinkedJobs()
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default getScrappedLinkedInJobsController
