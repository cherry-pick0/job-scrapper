import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String
})

const scrappedJobDataSchema = new mongoose.Schema({
  site: {
    type: String, // Or a more specific type if 'Site' is an enum
    required: true,
    enum: ['LinkedIn', 'Indeed']
  },
  searchQuery: {
    type: String,
    required: true
  },
  results: [jobSchema],
  browserPID: Number
})

const ScrappedJobData = mongoose.model('ScrappedJobData', scrappedJobDataSchema)
export default ScrappedJobData