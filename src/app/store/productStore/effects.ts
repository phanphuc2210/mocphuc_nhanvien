import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, exhaustMap, map, mergeMap, of, throwError } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";
import * as ProductsActions from "./action"

@Injectable()
export class ProductsEffects {
    getProducts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsActions.getProducts),
            mergeMap(() => {
                return this.productService.getAllProducts().pipe(
                    map((res) => {
                        const products = res
                        return ProductsActions.getProductsSuccess({products})
                    }),
                    catchError((error) => 
                        of(ProductsActions.getProductsFailure({error: error.error.message}))
                    )
                )
            })
        )
    )

    addProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsActions.addProduct),
            exhaustMap(action => {
                return this.productService.addNewProduct(action.product).pipe(
                    map(res => {
                        const product = res
                        Swal.fire({
                            background: '#000',
                            icon: 'success',
                            title: '<p class="text-xl text-slate-300">Thêm thành công</p>',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#0e9f6e',
                        })
                        return ProductsActions.addProductSuccess({product: product})
                    }),
                    catchError((error) => 
                        of(ProductsActions.addProductFailure({error: error.error.message}))
                    )
                )
            })
        )  
    )

    editProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsActions.editProduct),
            exhaustMap(action => {
                return this.productService.updateProduct(action.productId, action.product).pipe(
                    map(res => {
                        Swal.fire({
                            background: '#000',
                            icon: 'success',
                            title: '<p class="text-xl text-slate-300">Thay đổi thành công</p>',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#0e9f6e',
                        })
                        return ProductsActions.editProductSuccess({productId: res.id, product: res.product})
                    }),
                    catchError((error) => 
                        of(ProductsActions.editProductFailure({error: error.error.message}))
                    )
                )
            })
        )
    )

    removeProduct$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProductsActions.removeProduct),
            exhaustMap(action => {
                return this.productService.deleteProduct(action.productId).pipe(
                    map(res => { 
                        Swal.fire({
                            background: '#000',
                            icon: 'success',
                            title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#1a56db',
                        })
                        return ProductsActions.removeProductSuccess({productId: res.id})
                    }),
                    catchError((error) => 
                        of(ProductsActions.removeProductFailure({error: error.error.message}))
                    )
                )
            })
        )
    )

    constructor(private actions$: Actions, private productService: ProductService) {}
}