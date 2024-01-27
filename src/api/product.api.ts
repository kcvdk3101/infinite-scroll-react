import { API_PREFIX } from "../constants/api.prefix"
import { ProductModel } from "../models/product.model"
import { getAPI } from "./base.api"
import { ResponseGetProductWithPagination } from "./models/product.api.model"

type Params = {
  skip: number,
  limit: number
}

export const productApi = {
  getProductList({ skip, limit }: Params) {
    return getAPI<ResponseGetProductWithPagination>(`${API_PREFIX.PRODUCT}?limit=${limit}&skip=${skip}`)
  },
  getProductListWithSearch({ skip, limit, searchText }: Params & { searchText: string }) {
    return getAPI<ResponseGetProductWithPagination>(`${API_PREFIX.PRODUCT}/search?q=${searchText}&limit=${limit}&skip=${skip}`)
  },
  getProductDetail(id: number) {
    return getAPI<ProductModel>(`${API_PREFIX.PRODUCT}/${id}`)
  }
}