export type Job = {
  linkedInID: string
  title: string
  link: string
  company: string
  location: string
  postingDate: string
}

export type JobDetails = {
  level: string
  fullDescription: string
}

export enum Site {
  LinkedIn = 'LinkedIn',
  Indeed = 'Indeed'
}

export type SearchQuery = {
  site: Site
  location: string
  seniorityLevel: string
  position: string
  remote: boolean
}

export type ScrappedJobData = {
  searchQuery: SearchQuery
  results: Job[]
  browserPID?: number
}
