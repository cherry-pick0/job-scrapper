import express from 'express'
import scrapeLinkedInJobs from '@src/api/controllers/scrapeLinkedInJobs'

const router = express.Router()
router.get('/scrape/linkedin', scrapeLinkedInJobs)

export default router
