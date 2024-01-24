import LinkedInJobDetailsModel from '@src/db/models/LinkedInJobDetails'
import LinkedInJobModel from '@src/db/models/LinkedInJob'

const getLinkedInJobDetails = async (jobId: string) => {
  try {
    const job = await LinkedInJobModel.findById(jobId)
    const jobDetails = await LinkedInJobDetailsModel.findOne({ jobId })

    if (!job) {
      throw new Error(`Job with id ${jobId} not found`)
    }

    // Convert to plain objects and remove _id fields
    const jobObject: any = job.toObject()
    const jobDetailsObject: any = jobDetails ? jobDetails.toObject() : {}

    delete jobObject.__v
    delete jobDetailsObject.__v
    delete jobDetailsObject._id

    const result = {
      ...jobObject,
      ...jobDetailsObject
    }

    return result
  } catch (error) {
    console.error('Error retrieving job details:', error)
    throw error
  }
}

export default getLinkedInJobDetails
