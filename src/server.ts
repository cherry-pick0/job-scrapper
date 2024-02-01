import app from '@src/app'
import getMongoDbClient from '@src/db/getMongoDbClient'
import { scheduleLinkedInJobAIProcessing } from '@src/workers'

const { PORT = 3001 } = process.env

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`)

  await getMongoDbClient()
  scheduleLinkedInJobAIProcessing()
})
