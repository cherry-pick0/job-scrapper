import SearchRequestModel from '@src/db/models/SearchRequest'

const getSearchRequests = async () => {
  try {
    return await SearchRequestModel.find({}).sort({ createdAt: -1 }).limit(100)
  } catch (error) {
    console.error('Error retrieving scrapped job data:', error)
    throw error
  }
}

export default getSearchRequests
