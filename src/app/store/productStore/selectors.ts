import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/models/appState.interface";
import { Product } from "src/app/models/product.model";

export const selectFeature = (state: AppStateInterface) => state.products

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading)
export const productsSelector = createSelector(selectFeature, (state) => state.products)
export const productsByTypeIdSelector = (typeId: string) => 
    createSelector(productsSelector, (products) => {
        if(typeId != '') {
            return products.filter((product: Product) => product.typeId === Number(typeId))
        }
        return products
    })
export const errorSelector = createSelector(selectFeature, (state) => state.error)