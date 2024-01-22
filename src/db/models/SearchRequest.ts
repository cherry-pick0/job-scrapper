import mongoose from 'mongoose'

const searchRequestSchema = new mongoose.Schema({
  site: {
    type: String, // Or a more specific type if 'Site' is an enum
    required: true,
    enum: ['LinkedIn', 'Indeed']
  },
  searchQuery: {
    type: String,
    required: true
  },
  // results: [jobSchema],
  browserPID: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const SearchRequest = mongoose.model('SearchRequest', searchRequestSchema)
export default SearchRequest
