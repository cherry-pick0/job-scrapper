import Queue, { type Queue as QueueType } from 'bull'
import { LNK_JOB_DETAILS_SCRAP_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import { scrapeLinkedInJobDetails } from '@src/scrappers/linkedin'

let linkedInJobDetailsScrapQueue: QueueType

const createLinkedInJobDetailsScrapQueue = async (queueName: string): Promise <QueueType> => {
  try {
    const queue = new Queue(queueName, {
      redis: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT)
      }
    })
    queue.on('error', (error) => { console.error('Bull error:', error) })

    queue.process(async (task) => {
      const now = Date.now()
      // Skip older than 5min tasks
      if (now - task.timestamp > 60000 * 5) {
        console.log('Queue process task expired:', task.id, task.data)
        throw new Error('Task expired')
      }

      console.log('Queue process task:', task.id, task.data)
      const jobId: string = task.data.jobId
      if (!jobId) {
        throw new Error('Missing jobId')
      }
      await scrapeLinkedInJobDetails(jobId)
    }).catch((error) => { console.error('Queue process error:', error) })

    return queue
  } catch (error) {
    console.error('Bull connection error:', error)
    process.exit(1)
  }
}

export const getLinkedInJobDetailsScrapQueue = async (): Promise<QueueType> => {
  if (linkedInJobDetailsScrapQueue) {
    return linkedInJobDetailsScrapQueue
  }

  linkedInJobDetailsScrapQueue = await createLinkedInJobDetailsScrapQueue(LNK_JOB_DETAILS_SCRAP_QUEUE_NAME)
  return linkedInJobDetailsScrapQueue
}
