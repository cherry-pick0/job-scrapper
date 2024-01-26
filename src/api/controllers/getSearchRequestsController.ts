import type { Request, Response } from 'express'
import getSearchRequests from '@src/services/getSearchRequests'

const getSearchRequestsController = async (req: Request, res: Response) => {
  try {
    const result = await getSearchRequests()
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send({ status: 500, message: (e as Error).message })
  }
}

export default getSearchRequestsController
