import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product.model";

// GET
export const getProducts = createAction('[Products] Get Products')
export const getProductsSuccess = createAction(
    '[Products] Get Products success', 
    props<{products: Product[]}>()
)
export const getProductsFailure = createAction(
    '[Products] Get Products failure',
    props<{error: string}>()
)

// ADD
export const addProduct = createAction(
    '[Products] Add Product',
    props<{product:Product}>()
)
export const addProductSuccess = createAction(
    '[Products] Add Product success',
    props<{product:Product}>()
)
export const addProductFailure = createAction(
    '[Products] Add Product failure',
    props<{error: string}>()
)

// EDIT
export const editProduct = createAction(
    '[Products] Edit Product',
    props<{productId: string, product: Product}>()
)
export const editProductSuccess = createAction(
    '[Products] Edit Product success',
    props<{productId: string, product: Product}>()
)
export const editProductFailure = createAction(
    '[Products] Edit Product failure',
    props<{error: string}>()
)

// DELETE
export const removeProduct = createAction(
    '[Products] Remove Product',
    props<{productId: string}>()
)
export const removeProductSuccess = createAction(
    '[Products] Remove Product success',
    props<{productId: string}>()
)
export const removeProductFailure = createAction(
    '[Products] Remove Product failure',
    props<{error: string}>()
)

export const setErrorNull = createAction(
    '[Products] Set Error Null'
)