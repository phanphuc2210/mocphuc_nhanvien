import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormInputComponent } from './custom-form-input/custom-form-input.component';
import { ValidateInputComponent } from './validate-input/validate-input.component';
import { FormsModule } from '@angular/forms';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { CustomNumberInputComponent } from './custom-number-input/custom-number-input.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomImageInputComponent } from './custom-image-input/custom-image-input.component';



@NgModule({
  declarations: [
    CustomFormInputComponent,
    ValidateInputComponent,
    CustomTextareaComponent,
    CustomNumberInputComponent,
    CustomSelectComponent,
    CustomImageInputComponent
  ],
  imports: [
    CommonModule,
    NgxCurrencyModule,
    FormsModule,
  ],
  exports: [
    CustomFormInputComponent,
    ValidateInputComponent,
    CustomTextareaComponent,
    CustomNumberInputComponent,
    CustomSelectComponent,
    CustomImageInputComponent
  ]
})
export class CommonsModule { }
