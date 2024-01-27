import LinkedInJobDetailsModel from '@src/db/models/LinkedInJobDetails'
import SearchRequestModel from '@src/db/models/SearchRequest'
import LinkedInJobModel from '@src/db/models/LinkedInJob'

const runLinkedInJobAIProcessing = async (jobId: string): Promise<void> => {
  const job = await LinkedInJobModel.findById(jobId)
  const jobDetails = await LinkedInJobDetailsModel.findOne({ jobId })
  const searchRequest = await SearchRequestModel.findById(job?.searchRequestId)

  if (!(job && jobDetails && searchRequest)) {
    throw new Error(`Job info for ${jobId} not found`)
  }

  if (!jobDetails.flag_ai_process) {
    throw new Error('Job not flagged for AI processing')
  }

  // todo
}

export default runLinkedInJobAIProcessing
