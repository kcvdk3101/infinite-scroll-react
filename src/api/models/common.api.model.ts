export interface ResponseWithPagination<T> {
  total: number,
  skip: number,
  limit: number,
  products: Array<T>,
}