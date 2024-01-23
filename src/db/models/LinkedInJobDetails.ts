import mongoose from 'mongoose'
const Schema = mongoose.Schema

const linkedInJobDetailsSchema = new mongoose.Schema({
  description: String,
  level: String,
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
