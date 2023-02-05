import { Product } from "./product.model";

export interface ProductsStateInterface {
    isLoading: boolean
    products: Product[]
    error: string | undefined
}