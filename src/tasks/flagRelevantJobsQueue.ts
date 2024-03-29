import Queue, { type Queue as QueueType } from 'bull'
import { LNK_FLAG_RELEVANT_JOBS_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import flagJobForAIProcessing from '@src/services/flagJobForAIProcessing'

let linkedInJobDetailsScrapQueue: QueueType

const createFlagRelevantJobsQueue = async (queueName: string): Promise <QueueType> => {
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
        throw new Error('Missing jobId for ai flagging task')
      }
      await flagJobForAIProcessing(jobId)
    }).catch((error) => { console.error('Queue job-flagging-process error:', error) })

    return queue
  } catch (error) {
    throw new Error('Bull connection error')
  }
}

const flagRelevantJobsQueue = async (): Promise<QueueType> => {
  if (linkedInJobDetailsScrapQueue) {
    return linkedInJobDetailsScrapQueue
  }

  linkedInJobDetailsScrapQueue = await createFlagRelevantJobsQueue(LNK_FLAG_RELEVANT_JOBS_QUEUE_NAME)
  return linkedInJobDetailsScrapQueue
}

export default flagRelevantJobsQueue
