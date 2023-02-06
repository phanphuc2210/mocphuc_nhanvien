import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxCurrencyModule } from "ngx-currency";
import { AddproductComponent } from './addproduct/addproduct.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CanLeaveGuard } from 'src/app/guards/can-leave.guard';
import { SearchComponent } from './search/search.component';
import { ProductCardComponent } from 'src/app/commons/product-card/product-card.component';
import { ToastErrComponent } from 'src/app/commons/toast-err/toast-err.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/productStore/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from 'src/app/store/productStore/effects';


const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'add', component: AddproductComponent},
  {path: 'edit/:id', component: EditProductComponent, canDeactivate: [CanLeaveGuard]},
  {path: '', component: ListproductComponent}
];

@NgModule({
  declarations: [
    AddproductComponent,
    ListproductComponent,
    EditProductComponent,
    SearchComponent,
    ProductCardComponent,
    ToastErrComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductsEffects])    
  ]
})
export class ProductModule { }