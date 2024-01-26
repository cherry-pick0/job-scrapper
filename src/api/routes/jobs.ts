import express from 'express'
import scrapeLinkedInJobsController from '@src/api/controllers/scrapeLinkedInJobsController'
import getScrappedLinkedInJobsController from '@src/api/controllers/getScrappedLinkedInJobsController'
import getLinkedInJobDetailsController from '@src/api/controllers/getLinkedInJobDetailsController'
import getSearchRequestsController from '@src/api/controllers/getSearchRequestsController'

const router = express.Router()
router.post('/scrape/linkedin', scrapeLinkedInJobsController)
router.get('/search-requests', getSearchRequestsController)
router.get('/linkedin-jobs', getScrappedLinkedInJobsController)
router.get('/linkedin-jobs/:jobId', getLinkedInJobDetailsController)

export default router
