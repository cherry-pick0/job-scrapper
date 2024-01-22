import mongoose from 'mongoose'
const Schema = mongoose.Schema

const linkedInJobSchema = new mongoose.Schema({
  searchRequestId: {
    type: Schema.Types.ObjectId,
    ref: 'SearchRequest'
  },
  linkedInID: {
    type: String,
    unique: true
  },
  title: String,
  company: String,
  location: String,
  link: String,
  postingDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const LinkedInJob = mongoose.model('LinkedInJob', linkedInJobSchema)
export default LinkedInJob
