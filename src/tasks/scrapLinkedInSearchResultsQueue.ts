import Queue, { type Queue as QueueType } from 'bull'
import { LNK_SEARCH_SCRAP_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import { scrapeLinkedInSearchResults } from '@src/scrappers/linkedin'

let linkedInSearchResultsScrapQueue: QueueType

const createLinkedInSearchResultsScrapQueue = async (queueName: string): Promise <QueueType> => {
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
        throw new Error(`Task ${task.id} expired: ${task.data}`)
      }

      const searchRequestId: string = task.data.searchRequestId
      if (!searchRequestId) {
        throw new Error('Missing searchRequestId')
      }
      await scrapeLinkedInSearchResults(searchRequestId)
    }).catch((error) => { console.error('Queue process error:', error) })

    return queue
  } catch (error) {
    throw new Error('Bull connection error')
  }
}

const scrapLinkedInSearchResultsQueue = async (): Promise<QueueType> => {
  if (linkedInSearchResultsScrapQueue) {
    return linkedInSearchResultsScrapQueue
  }

  linkedInSearchResultsScrapQueue = await createLinkedInSearchResultsScrapQueue(LNK_SEARCH_SCRAP_QUEUE_NAME)
  return linkedInSearchResultsScrapQueue
}

export default scrapLinkedInSearchResultsQueue
