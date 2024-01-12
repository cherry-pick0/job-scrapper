import express from 'express'
import scrapeLinkedInData from '@src/api/controllers/scrapeLinkedInData'
import getScrappedLinkedInData from '@src/services/getScrappedLinkedInData'

const router = express.Router()
router.post('/scrape/linkedin', scrapeLinkedInData)
router.get('/linkedin-jobs', getScrappedLinkedInData)

export default router
