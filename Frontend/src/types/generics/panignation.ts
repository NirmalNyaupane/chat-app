export interface PaginatedResponse<T>{
    prevPage: any
    nextPage: any
    currentPage: number
    lastPage: number
    totalCount: number
    data: T[]
}