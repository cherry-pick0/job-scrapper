import Queue, { type Queue as QueueType } from 'bull'
import { QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'

let queueClient: QueueType

const createQueueClient = async (): Promise <QueueType> => {
  try {
    const client = new Queue(QUEUE_NAME, {
      redis: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT)
      }
    })

    return client
  } catch (error) {
    console.error('Queue client connection error:', error)
    process.exit(1)
  }
}

const getQueueClient = async (): Promise<QueueType> => {
  if (queueClient) {
    return queueClient
  }

  queueClient = await createQueueClient()
  return queueClient
}

export default getQueueClient
