import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CustomFormInputComponent } from './custom-form-input/custom-form-input.component';
import { ValidateInputComponent } from './validate-input/validate-input.component';
import { FormsModule } from '@angular/forms';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { CustomNumberInputComponent } from './custom-number-input/custom-number-input.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomImageInputComponent } from './custom-image-input/custom-image-input.component';
import { CustomTextRichComponent } from './custom-text-rich/custom-text-rich.component';

@NgModule({
  declarations: [
    CustomFormInputComponent,
    ValidateInputComponent,
    CustomTextareaComponent,
    CustomNumberInputComponent,
    CustomSelectComponent,
    CustomImageInputComponent,
    CustomTextRichComponent,
  ],
  imports: [
    CommonModule,
    NgxCurrencyModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule
  ],
  exports: [
    CustomFormInputComponent,
    ValidateInputComponent,
    CustomTextareaComponent,
    CustomNumberInputComponent,
    CustomSelectComponent,
    CustomImageInputComponent,
    CustomTextRichComponent
  ]
})
export class CommonsModule { }
