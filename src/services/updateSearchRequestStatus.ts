import SearchRequestModel from '@src/db/models/SearchRequest'

const updateSearchRequestStatus = async (searchRequestId: string, status: 'Pending' | 'Error' | 'In progress' | 'Completed', error?: string): Promise <void> => {
  const searchRequest = await SearchRequestModel.findById(searchRequestId)

  if (!searchRequest) {
    throw new Error(`SearchRequest with id ${searchRequestId} not found`)
  }

  searchRequest.status = status
  searchRequest.error = error

  await searchRequest.save()
    .then(doc => {
      searchRequestId = doc.id
    })
    .catch(err => { console.error('Error updating SearchRequestModel:', err) })
}

export default updateSearchRequestStatus
