import Queue, { type Queue as QueueType } from 'bull'
import { MAIN_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import { scrapeJobs } from '@src/scrappers/linkedin'
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
      const now = Date.now()
      // Skip older than 1min tasks
      if (now - task.timestamp > 60000) {
        console.log('Queue process task expired:', task.id, task.data)
        throw new Error('Task expired')
      }

      console.log('Queue process task:', task.id, task.data)
      const result = await scrapeJobs(JSON.stringify(task.data))
      await saveScrappedJobData(result)
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
