import LinkedInJobDetailsModel from '@src/db/models/LinkedInJobDetails'
import SearchRequestModel from '@src/db/models/SearchRequest'
import LinkedInJobModel from '@src/db/models/LinkedInJob'
import getDataAIProcessingProxy from '@src/proxies/dataAIProcessingProxy'

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

  if (!jobDetails.description) {
    throw new Error('Job description not found')
  }

  const dataAIProcessingProxy = await getDataAIProcessingProxy()
  const response = await dataAIProcessingProxy.summarizeText(jobDetails.description)
  jobDetails.ai_summarized_description = response.summarized_text
  // todo find a better way
  jobDetails.flag_ai_process = false

  await jobDetails.save()
    .then(_ => {
      console.log('Job description summarized with AI: ', jobId)
    })
    .catch(err => { console.error('Error saving LinkedInJobDetailsModel:', err) })
}

export default runLinkedInJobAIProcessing
