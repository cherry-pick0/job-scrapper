import mongoose from 'mongoose'
import { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD } from './dbConfig'

let mongoDbClient: typeof mongoose

const createMongoDbClient = async (): Promise<typeof mongoose> => {
  try {
    const client = await mongoose.connect(MONGODB_URI, {
      user: MONGODB_USERNAME,
      pass: MONGODB_PASSWORD
    })

    client.connection.on('connected', () => {
      console.log('MongoDB is connected')
    })

    client.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
      process.exit(1)
    })

    client.connection.on('disconnected', () => {
      console.log('MongoDB is disconnected')
    })

    return client
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export const closeMongoDbClient = async (): Promise<void> => {
  if (mongoDbClient) {
    await mongoDbClient.connection.close()
  }
}

const getMongoDbClient = async (): Promise<typeof mongoose> => {
  if (mongoDbClient) {
    return mongoDbClient
  }

  mongoDbClient = await createMongoDbClient()
  return mongoDbClient
}

export default getMongoDbClient
