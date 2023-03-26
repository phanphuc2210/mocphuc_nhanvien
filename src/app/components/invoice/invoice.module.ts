import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { CommonsModule } from 'src/app/commons/commons.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    CommonsModule,
    RouterModule.forChild(routes)
  ]
})
export class InvoiceModule { }
