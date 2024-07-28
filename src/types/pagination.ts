export const perPageOptions = [10, 25, 50, 100] as const
export type PerPageOption = (typeof perPageOptions)[number]

export type PaginatorOption = 'prev' | 'next'

export type Pagination = {
  perPage: PerPageOption
  page: number
}
