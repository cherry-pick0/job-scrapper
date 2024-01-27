import Queue, { type Queue as QueueType } from 'bull'
import { LNK_AI_PROCESS_RELEVANT_JOBS_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from './queueConfig'
import runLinkedInJobAIProcessing from '@src/services/runLinkedInJobAIProcessing'

let linkedInJobDetailsScrapQueue: QueueType

const createLinkedInJobProcessingQueue = async (queueName: string): Promise <QueueType> => {
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
        throw new Error('Missing jobId for ai processing job task')
      }
      await runLinkedInJobAIProcessing(jobId)
    }).catch((error) => { console.error('Queue job-ai-process error:', error) })

    return queue
  } catch (error) {
    console.error('Bull connection error:', error)
    process.exit(1)
  }
}

const processLinkedInJobsQueue = async (): Promise<QueueType> => {
  if (linkedInJobDetailsScrapQueue) {
    return linkedInJobDetailsScrapQueue
  }

  linkedInJobDetailsScrapQueue = await createLinkedInJobProcessingQueue(LNK_AI_PROCESS_RELEVANT_JOBS_QUEUE_NAME)
  return linkedInJobDetailsScrapQueue
}

export default processLinkedInJobsQueue
