import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddwoodComponent } from './addwood/addwood.component';
import { ListwoodComponent } from './listwood/listwood.component';
import { EditwoodComponent } from './editwood/editwood.component';
import { CanLeaveGuard } from 'src/app/guards/can-leave.guard';
import { CommonsModule } from 'src/app/commons/commons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'add', component: AddwoodComponent},
  {path: 'edit/:id', component: EditwoodComponent, canDeactivate: [CanLeaveGuard]},
  {path: '', component: ListwoodComponent}
];

@NgModule({
  declarations: [
    AddwoodComponent,
    ListwoodComponent,
    EditwoodComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonsModule,
    RouterModule.forChild(routes),
  ]
})
export class WoodModule { }
