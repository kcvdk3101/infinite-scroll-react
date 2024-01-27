import { ProductModel } from "../../models/product.model";
import { ResponseWithPagination } from "./common.api.model";

export interface ResponseGetProductWithPagination extends ResponseWithPagination<ProductModel> { }