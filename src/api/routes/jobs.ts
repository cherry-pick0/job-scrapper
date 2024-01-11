import express from 'express'
import scrapeLinkedInJobs from '@src/api/controllers/scrapeLinkedInJobs'
import getScrappedLinkedInJobs from '@src/services/getScrappedLinkedInJobs'

const router = express.Router()
router.post('/scrape/linkedin', scrapeLinkedInJobs)
router.get('/linkedin-jobs', getScrappedLinkedInJobs)

export default router
