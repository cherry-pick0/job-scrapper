import LinkedInJobModel from '@src/db/models/LinkedInJob'
import getMongoDbClient from '@src/db/getMongoDbClient'

const getScrappedLinkedJobs = async () => {
  try {
    await getMongoDbClient()
    return await LinkedInJobModel.find({}).sort({ postingDate: -1 }).limit(100)
  } catch (error) {
    console.error('Error retrieving scrapped job data:', error)
    throw error
  }
}

export default getScrappedLinkedJobs
