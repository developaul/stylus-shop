export interface Paginate<T> {
  info: {
    hasNextPage: boolean
    nextPage?: number
    pages: number
  }
  docs: T
}