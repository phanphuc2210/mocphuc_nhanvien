import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: ':orderId', component: InvoiceDetailComponent}
];

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class InvoiceModule { }
