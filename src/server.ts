import app from '@src/app'
import getMongoDbClient from './db/getMongoDbClient'

const { PORT = 3000 } = process.env

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

getMongoDbClient().catch((error) => {
  console.error(error)
})
