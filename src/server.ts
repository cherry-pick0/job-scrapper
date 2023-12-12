import app from '@src/app'
import getMongoDbClient from '@src/db/getMongoDbClient'
import { scrapeLinkedInJobs } from '@src/scrappers/jobs/linkedInScrapper'

const { PORT = 3000 } = process.env

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

getMongoDbClient().catch((error) => {
  console.error(error)
})

scrapeLinkedInJobs().catch((error) => {
  console.error(error)
})
