import LinkedInJobDetailsModel from '@src/db/models/LinkedInJobDetails'
import SearchRequestModel from '@src/db/models/SearchRequest'
import LinkedInJobModel from '@src/db/models/LinkedInJob'

const flagJobForAIProcessing = async (jobId: string): Promise<void> => {
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
    if (job.location?.toLowerCase().includes(keyword) ||
        job.title?.toLowerCase().includes(keyword) ||
        jobDetails.level?.toLowerCase().includes(keyword)) {
      matchCount++
    }
  })

  // Calculate match percentage
  const matchPercentage = (matchCount / keywords.length) * 100
  const isMatch = matchPercentage >= 50
  jobDetails.flag_ai_process = isMatch

  await jobDetails.save()
    .then(_ => {
      console.log('LinkedInJob flagged for AI processing: ', jobId)
    })
    .catch(err => { console.error('Error saving LinkedInJobDetailsModel:', err) })
}

export default flagJobForAIProcessing
