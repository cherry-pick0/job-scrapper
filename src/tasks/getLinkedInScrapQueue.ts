import Queue, { type Queue as QueueType } from 'bull'
import { MAIN_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import { scrapeJobs } from '../scrappers/linkedInScrapper'
import saveScrappedJobData from '@src/services/saveScrappedJobData'

let linkedInScrapQueue: QueueType

const createLinkedInScrapQueue = async (queueName: string): Promise <QueueType> => {
  try {
    const queue = new Queue(queueName, {
      redis: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT)
      }
    })
    queue.on('error', (error) => { console.error('Bull error:', error) })

    queue.process(async (task) => {
      const result = await scrapeJobs(JSON.stringify(task.data))
      await saveScrappedJobData(result)

      await Promise.resolve()
    }).catch((error) => { console.error('Queue process error:', error) })

    return queue
  } catch (error) {
    console.error('Bull connection error:', error)
    process.exit(1)
  }
}

export const getLinkedInScrapQueue = async (): Promise<QueueType> => {
  if (linkedInScrapQueue) {
    return linkedInScrapQueue
  }

  linkedInScrapQueue = await createLinkedInScrapQueue(MAIN_QUEUE_NAME)
  return linkedInScrapQueue
}
