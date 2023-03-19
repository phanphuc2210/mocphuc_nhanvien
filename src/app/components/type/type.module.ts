import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListtypeComponent } from './listtype/listtype.component';
import { AddtypeComponent } from './addtype/addtype.component';
import { EdittypeComponent } from './edittype/edittype.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from 'src/app/commons/commons.module';
import { RouterModule, Routes } from '@angular/router';
import { CanLeaveGuard } from 'src/app/guards/can-leave.guard';

const routes: Routes = [
  {path: 'add', component: AddtypeComponent},
  {path: 'edit/:id', component: EdittypeComponent, canDeactivate: [CanLeaveGuard]},
  {path: '', component: ListtypeComponent}
];

@NgModule({
  declarations: [
    ListtypeComponent,
    AddtypeComponent,
    EdittypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonsModule,
    RouterModule.forChild(routes),
  ]
})
export class TypeModule { }
