import '@src/env'
import express, { json } from 'express'
import cors from 'cors'
import routes from './api'

const app = express()
app.use(cors())
app.use(json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api', routes)

export default app
