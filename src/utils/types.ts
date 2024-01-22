export type Job = {
  linkedInID: string
  title: string
  link: string
  company: string
  location: string
  postingDate: string
}

export enum Site {
  LinkedIn = 'LinkedIn',
  Indeed = 'Indeed'
}

export type SearchParams = {
  site: Site
  searchQuery: string
}

export type ScrappedJobData = {
  searchParams: SearchParams
  results: Job[]
  browserPID?: number
}
