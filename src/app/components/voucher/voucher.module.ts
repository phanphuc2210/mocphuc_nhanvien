import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddvoucherComponent } from './addvoucher/addvoucher.component';
import { EditVoucherComponent } from './edit-voucher/edit-voucher.component';
import { ListVoucherComponent } from './list-voucher/list-voucher.component';
import { CanLeaveGuard } from 'src/app/guards/can-leave.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from 'src/app/commons/commons.module';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {path: 'add', component: AddvoucherComponent},
  {path: 'edit/:id', component: EditVoucherComponent, canDeactivate: [CanLeaveGuard]},
  {path: '', component: ListVoucherComponent}
];

@NgModule({
  declarations: [
    AddvoucherComponent,
    EditVoucherComponent,
    ListVoucherComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ]
})
export class VoucherModule { }
