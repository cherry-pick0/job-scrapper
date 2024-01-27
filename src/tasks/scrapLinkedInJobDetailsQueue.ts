import Queue, { type Queue as QueueType } from 'bull'
import { LNK_JOB_DETAILS_SCRAP_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import { scrapeLinkedInJobDetails } from '@src/scrappers/linkedin'
import flagRelevantJobsQueue from './flagRelevantJobsQueue'

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
        throw new Error(`Task ${task.id} expired: ${task.data}`)
      }

      const jobId: string = task.data.jobId
      if (!jobId) {
        throw new Error('Missing jobId')
      }
      await scrapeLinkedInJobDetails(jobId)

      // Flag job for AI processing
      const flagQueue = await flagRelevantJobsQueue()
      await flagQueue.add({ jobId }, { delay: 1000 })
    }).catch((error) => { console.error('Queue job-details-process error:', error) })

    return queue
  } catch (error) {
    console.error('Bull connection error:', error)
    process.exit(1)
  }
}

const scrapLinkedInJobDetailsQueue = async (): Promise<QueueType> => {
  if (linkedInJobDetailsScrapQueue) {
    return linkedInJobDetailsScrapQueue
  }

  linkedInJobDetailsScrapQueue = await createLinkedInJobDetailsScrapQueue(LNK_JOB_DETAILS_SCRAP_QUEUE_NAME)
  return linkedInJobDetailsScrapQueue
}

export default scrapLinkedInJobDetailsQueue
