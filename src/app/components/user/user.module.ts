import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './list-user/list-user.component';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CanLeaveGuard } from 'src/app/guards/can-leave.guard';

const routes: Routes = [
  {path: 'edit', component: EditUserComponent, canDeactivate: [CanLeaveGuard]},
  {path: ':role', component: ListUserComponent},
];

@NgModule({
  declarations: [
    ListUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
