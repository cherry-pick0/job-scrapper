import app from '@src/app'
import { scrapeLinkedInJobs } from '@src/scrappers/jobs/linkedInScrapper'
import saveScrappedJobData from '@src/services/saveScrappedJobData'

const { PORT = 3000 } = process.env

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

// test linkedin scrapper
scrapeLinkedInJobs('keywords=Python Developer&location=European Union').then(result => {
  console.log('Successfully scrapped data from LinkedIn')
  saveScrappedJobData(result).then(result2 => {
    console.log('Successfully saved data into db')
  }).catch((error) => {
    console.error(error)
  })
}).catch((error) => {
  console.error(error)
})
