import ScrappedJobData from '@src/db/models/ScrappedJobData'
import getMongoDbClient from '@src/db/getMongoDbClient'

const getScrappedLinkedInData = async () => {
  try {
    const client = await getMongoDbClient()
    console.log(client.connection.readyState)
    const allData = await ScrappedJobData.find({}).sort({ createdAt: -1 }).limit(100)
    return allData
  } catch (error) {
    console.error('Error retrieving scrapped job data:', error)
    throw error
  }
}

export default getScrappedLinkedInData
