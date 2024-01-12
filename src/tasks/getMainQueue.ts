import Queue, { type Queue as QueueType } from 'bull'
import { MAIN_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import { scrapeJobs } from '../scrappers/linkedInScrapper'
import saveScrappedJobData from '@src/services/saveScrappedJobData'

let mainQueue: QueueType

const createMainQueue = async (queueName: string): Promise <QueueType> => {
  try {
    console.log('create queue:', queueName)
    const queue = new Queue(queueName, {
      redis: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT)
      }
    })
    queue.on('error', (error) => { console.error('Bull error:', error) })

    await queue.process(async (job) => {
      console.log('Processing job:', job.data)

      if (job.data.task === 'scrapeLinkedInJobsTask') {
        console.log('Processing task scrapeLinkedInJobsTask: ', job.data)
        const result = await scrapeJobs(JSON.stringify(job.data))
        await saveScrappedJobData(result)
      }

      await Promise.resolve()
    })

    return queue
  } catch (error) {
    console.error('Bull connection error:', error)
    process.exit(1)
  }
}

export const getMainQueue = async (): Promise<QueueType> => {
  if (mainQueue) {
    return mainQueue
  }

  mainQueue = await createMainQueue(MAIN_QUEUE_NAME)
  console.log('created main queue')
  return mainQueue
}
