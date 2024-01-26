import LinkedInJobDetailsModel from '@src/db/models/LinkedInJobDetails'

const flagJobForAIProcessing = async (jobId: string): Promise<void> => {
  console.log('set flag_ai_process as true for ', jobId)
  const jobDetails = await LinkedInJobDetailsModel.findOne({ jobId })
  console.log('jobDetails', jobDetails)

  if (!jobDetails) {
    throw new Error(`Job default for ${jobId} not found`)
  }

  // todo process
  jobDetails.flag_ai_process = true

  await jobDetails.save()
    .then(doc => {
      console.log('LinkedInJobDetailsModel flagged for AI processing:', doc)
    })
    .catch(err => { console.error('Error saving LinkedInJobDetailsModel:', err) })
}

export default flagJobForAIProcessing
