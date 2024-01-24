import { type Job } from '@src/utils/types'
import LinkedInJobModel from '@src/db/models/LinkedInJob'

const addLinkedInJob = async (searchRequestId: string, job: Job): Promise<string> => {
  const { linkedInID, title, company, location, link, postingDate } = job
  const jobData = new LinkedInJobModel({ searchRequestId, linkedInID, title, company, location, link, postingDate })
  let jobId: string | undefined

  // Save the new object to the database
  await jobData.save()
    .then(doc => {
      console.log('LinkedInJobModel saved:', doc)
      jobId = doc.id
    })
    .catch(err => { console.error('Error saving LinkedInJobModel:', err) })

  if (!jobId) {
    throw new Error('Error saving LinkedInJobModel')
  }

  return jobId
}

export default addLinkedInJob
