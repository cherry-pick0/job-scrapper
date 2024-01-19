import express from 'express'
import scrapeLinkedInJobsController from '@src/api/controllers/scrapeLinkedInJobsController'
import getScrappedLinkedInJobsController from '@src/api/controllers/getScrappedLinkedInJobsController'

const router = express.Router()
router.post('/scrape/linkedin', scrapeLinkedInJobsController)
router.get('/linkedin-jobs', getScrappedLinkedInJobsController)

export default router
