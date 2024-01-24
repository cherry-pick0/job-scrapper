import type { Request, Response } from 'express'
import getScrappedLinkedInJobDetails from '@src/services/getScrappedLinkedInJobDetails'

const getLinkedInJobDetailsController = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId
    const result = await getScrappedLinkedInJobDetails(jobId)
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default getLinkedInJobDetailsController
