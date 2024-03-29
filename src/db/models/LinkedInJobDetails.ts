import mongoose from 'mongoose'
const Schema = mongoose.Schema

const linkedInJobDetailsSchema = new mongoose.Schema({
  description: String,
  ai_summarized_description: {
    type: String,
    default: undefined
  },
  level: String,
  flag_ai_process: {
    type: Boolean,
    default: undefined
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'LinkedInJob'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const LinkedInJobDetails = mongoose.model('LinkedInJobDetails', linkedInJobDetailsSchema)
export default LinkedInJobDetails
