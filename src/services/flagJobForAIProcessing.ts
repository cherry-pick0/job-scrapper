import LinkedInJobDetailsModel from '@src/db/models/LinkedInJobDetails'
import SearchRequestModel from '@src/db/models/SearchRequest'
import LinkedInJobModel from '@src/db/models/LinkedInJob'

const flagJobForAIProcessing = async (jobId: string): Promise<void> => {
  console.log('set flag_ai_process as true for ', jobId)
  const job = await LinkedInJobModel.findById(jobId)
  const jobDetails = await LinkedInJobDetailsModel.findOne({ jobId })
  const searchRequest = await SearchRequestModel.findById(job?.searchRequestId)

  if (!(job && jobDetails && searchRequest)) {
    throw new Error(`Job info for ${jobId} not found`)
  }

  // Filter out jobs that are not relevant
  // Extract keywords from searchRequest.searchParams
  const keywords = [
    ...searchRequest.searchParams.location.toLowerCase().split(/\s+/),
    ...searchRequest.searchParams.position.toLowerCase().split(/\s+/),
    ...searchRequest.searchParams.seniorityLevel.toLowerCase().replace('/', '-').split(/\s+/)
  ]

  // Count the number of keywords found in job and jobDetails
  let matchCount = 0
  keywords.forEach(keyword => {
    if (job.location?.toLowerCase().includes(keyword) ??
        job.title?.toLowerCase().includes(keyword) ??
        jobDetails.level?.toLowerCase().includes(keyword)) {
      matchCount++
    }
  })

  // Calculate match percentage
  const matchPercentage = (matchCount / keywords.length) * 100
  // todo: find better matchPercentage threshold
  const isMatch = matchPercentage >= 25
  jobDetails.flag_ai_process = isMatch

  await jobDetails.save()
    .then(doc => {
      console.log('LinkedInJobDetailsModel flagged for AI processing:', doc)
    })
    .catch(err => { console.error('Error saving LinkedInJobDetailsModel:', err) })
}

export default flagJobForAIProcessing
