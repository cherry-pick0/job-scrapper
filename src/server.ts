import app from '@src/app'
import getMongoDbClient from '@src/db/getMongoDbClient'

const { PORT = 3000 } = process.env

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`)
  await getMongoDbClient()
})
