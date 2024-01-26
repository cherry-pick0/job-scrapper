import type { SearchQuery } from '@src/utils/types'
import SearchRequestModel from '@src/db/models/SearchRequest'

const addSearchRequest = async (searchQuery: SearchQuery): Promise <string> => {
  const { site, location, seniorityLevel, position, remote } = searchQuery
  const data = { searchParams: { location, seniorityLevel, position, remote }, site }
  const searchRequest = new SearchRequestModel(data)
  let searchRequestId: string | undefined

  await searchRequest.save()
    .then(doc => {
      console.log('SearchRequestModel saved:', doc)
      searchRequestId = doc.id
    })
    .catch(err => { console.error('Error saving SearchRequestModel:', err) })

  if (!searchRequestId) {
    throw new Error('Error saving SearchRequestModel')
  }

  return searchRequestId
}

export default addSearchRequest
