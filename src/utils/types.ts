export type Job = {
  title: string
}

export enum Site {
  LinkedIn = 'LinkedIn',
  Indeed = 'Indeed'
}

export type ScrappedJobData = {
  site: Site
  searchQuery: string
  results: Job[]
  browserPID?: number
}
