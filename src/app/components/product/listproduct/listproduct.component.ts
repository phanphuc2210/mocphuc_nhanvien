import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import * as ProductsAction from "src/app/store/productStore/action"
import { Observable } from 'rxjs';
import { errorSelector, isLoadingSelector, productsByTypeIdSelector, productsSelector } from 'src/app/store/productStore/selectors';
import { AppStateInterface } from 'src/app/models/appState.interface';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent implements OnInit, OnDestroy{
  isLoading$: Observable<boolean>
  error$: Observable<string | undefined>
  products$!: Observable<Product[] | any>
  
  // products: Product[] = [];
  types$!: Observable<ProductType[]> 
  classify: string = ''; 
  p:number = 1;
  itemsPerPage:number = 8;

  constructor(private productService: ProductService, private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.products$ = this.store.pipe(select(productsSelector))
  }

  ngOnInit(): void {
    this.types$ = this.productService.getProductTypes()

    this.store.dispatch(ProductsAction.getProducts())
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProductsAction.setErrorNull())
  }

  // phân loại sản phẩm
  public productClassification() { 
    // this.productService.getAllProducts(this.classify).subscribe(res => {
    //   this.products = res.result;
    //   this.p = 1;
    //   this.totalProduct = this.products.length;
    // })

    this.products$ = this.store.pipe(select(productsByTypeIdSelector(this.classify)))
    this.p = 1
  }
}
