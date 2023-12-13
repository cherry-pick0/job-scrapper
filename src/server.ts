import app from '@src/app'
import getMongoDbClient from '@src/db/getMongoDbClient'
import { scrapeLinkedInJobs } from '@src/scrappers/jobs/linkedInScrapper'

const { PORT = 3000 } = process.env

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

// test db connection
getMongoDbClient().catch((error) => {
  console.error(error)
})

// test linkedin scrapper
scrapeLinkedInJobs('keywords=Python Developer&location=European Union').catch((error) => {
  console.error(error)
})
