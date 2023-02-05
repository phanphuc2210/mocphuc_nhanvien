import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductsStateInterface } from 'src/app/models/productsState.interface';
import * as ProductsAction from './action';

export const initialState: ProductsStateInterface = {
  isLoading: false,
  products: [],
  error: undefined,
};

export const reducers = createReducer(
  initialState,
  on(ProductsAction.getProducts, (state) => ({ ...state, isLoading: true })),
  on(ProductsAction.getProductsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    products: action.products,
    error: undefined,
  })),
  on(ProductsAction.getProductsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(ProductsAction.addProduct, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductsAction.addProductSuccess, (state, action) => {
    const newProducts = [...state.products, action.product];
    return { ...state, isLoading: false, products: newProducts, error: undefined, };
  }),
  on(ProductsAction.addProductFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(ProductsAction.editProduct, (state) => ({
    ...state, isLoading: true
  })),
  on(ProductsAction.editProductSuccess, (state, action) => {
    let newProducts: Product[] = [...state.products]
    newProducts.forEach((product, index) => {
        if(product.id === Number(action.productId)) {
            newProducts[index] = {
                id: Number(action.productId),
                ...action.product
            }
        }
    })
    return { ...state, isLoading: false, products: newProducts,  error: undefined,};
  }),
  on(ProductsAction.editProductFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(ProductsAction.removeProduct, (state) => ({
    ...state, isLoading: true
  })),
  on(ProductsAction.removeProductSuccess, (state, action) => {
    let newProducts: Product[] = [...state.products]
    newProducts = newProducts.filter(product => product.id !== Number(action.productId))
    return { ...state, isLoading: false, products: newProducts, error: undefined, };
  }),
  on(ProductsAction.removeProductFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(ProductsAction.setErrorNull, state => ({
    ...state,
    error: undefined,
  }))
);
