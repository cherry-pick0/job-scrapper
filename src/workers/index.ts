import cron from 'node-cron'
import LinkedInJobDetails from '@src/db/models/LinkedInJobDetails'
import processLinkedInJobsQueue from '@src/tasks/processLinkedInJobsQueue'

export const scheduleLinkedInJobAIProcessing = () => {
  // Task to run every minute
  cron.schedule('* * * * *', async () => { // Make this an async function
    try {
      // Get all jobs flagged for AI processing
      const docs = await LinkedInJobDetails.find({ flag_ai_process: true })
      const jobIds = docs.map(doc => doc.jobId?.toString())

      if (!jobIds.length) {
        // No jobs to process
        return
      }

      // Add to queue
      const queue = await processLinkedInJobsQueue()

      for (const jobId of jobIds) {
        if (!jobId) continue
        await queue.add({ jobId })
      }
    } catch (err) {
      console.error('Error on scheduleLinkedInJobAIProcessing:', err)
    }
  })
}
