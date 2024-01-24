import { type JobDetails } from '@src/utils/types'
import LinkedInJobDetailsModel from '@src/db/models/LinkedInJobDetails'

const addLinkedInJobDetails = async (jobId: string, jobDetails: JobDetails): Promise<string> => {
  const { level, fullDescription: description } = jobDetails
  const jobDetailsData = new LinkedInJobDetailsModel({ jobId, level, description })
  let jobDetailsId: string | undefined

  // Save the new object to the database
  await jobDetailsData.save()
    .then(doc => {
      console.log('LinkedInJobDetailsModel saved:', doc)
      jobDetailsId = doc.id
    })
    .catch(err => { console.error('Error saving LinkedInJobDetailsModel:', err) })

  if (!jobDetailsId) {
    throw new Error('Error saving LinkedInJobDetailsModel')
  }

  return jobDetailsId
}

export default addLinkedInJobDetails
