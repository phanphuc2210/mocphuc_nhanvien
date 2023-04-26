import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSliderComponent } from './list-slider/list-slider.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonsModule } from 'src/app/commons/commons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {path: '', component: ListSliderComponent}
];

@NgModule({
  declarations: [
    ListSliderComponent
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
export class SliderModule { }
