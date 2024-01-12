import type { ScrappedJobData } from '@src/utils/types'
import getMongoDbClient from '@src/db/getMongoDbClient'
import ScrapedJobDataModel from '@src/db/models/ScrappedJobData'

const saveScrappedJobData = async (scrappedData: ScrappedJobData) => {
  await getMongoDbClient()

  console.log('Saving scrapped data to database: ', scrappedData)

  const jobData = new ScrapedJobDataModel({ ...scrappedData.searchParams, results: scrappedData.results })

  // Save the new object to the database
  await jobData.save()
    .then(doc => { console.log('Document saved:', doc) })
    .catch(err => { console.error('Error saving document:', err) })
}

export default saveScrappedJobData
