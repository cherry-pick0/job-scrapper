import express from 'express'
import jobs from '@src/api/routes/jobs'

const router = express.Router()
router.use('/jobs', jobs)
export default router
