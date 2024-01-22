import LinkedInJobModel from '@src/db/models/LinkedInJob'
import getMongoDbClient from '@src/db/getMongoDbClient'

const getScrappedLinkedInData = async () => {
  try {
    const client = await getMongoDbClient()
    console.log(client.connection.readyState)
    const allData = await LinkedInJobModel.find({}).sort({ postingDate: -1 }).limit(100)
    return allData
  } catch (error) {
    console.error('Error retrieving scrapped job data:', error)
    throw error
  }
}

export default getScrappedLinkedInData
