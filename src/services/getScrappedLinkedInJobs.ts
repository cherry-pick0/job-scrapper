import LinkedInJobModel from '@src/db/models/LinkedInJob'

const getScrappedLinkedJobs = async () => {
  try {
    return await LinkedInJobModel.find({}).sort({ postingDate: -1 }).limit(100)
  } catch (error) {
    console.error('Error retrieving scrapped job data:', error)
    throw error
  }
}

export default getScrappedLinkedJobs
