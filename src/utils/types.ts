export type Job = {
  title: string
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
