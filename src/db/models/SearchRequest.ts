import mongoose from 'mongoose'

const searchParamsSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  seniorityLevel: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  remote: {
    type: Boolean,
    required: true
  }
})

const searchRequestSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Error', 'In progress', 'Completed']
  },
  error: {
    type: String,
    required: false
  },
  site: {
    type: String, // Or a more specific type if 'Site' is an enum
    required: true,
    enum: ['LinkedIn', 'Indeed']
  },
  searchParams: {
    type: searchParamsSchema,
    required: true
  },
  browserPID: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const SearchRequest = mongoose.model('SearchRequest', searchRequestSchema)
export default SearchRequest
