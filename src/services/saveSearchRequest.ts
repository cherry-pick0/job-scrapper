import type { SearchParams } from '@src/utils/types'
import getMongoDbClient from '@src/db/getMongoDbClient'
import SearchRequestModel from '@src/db/models/SearchRequest'

const saveSearchRequest = async (searchParams: SearchParams): Promise <string> => {
  await getMongoDbClient()

  const searchRequest = new SearchRequestModel({ searchQuery: searchParams.searchQuery.toString(), site: searchParams.site })
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

export default saveSearchRequest
