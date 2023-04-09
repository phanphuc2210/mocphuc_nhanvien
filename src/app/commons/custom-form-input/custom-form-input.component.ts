import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-custom-form-input',
  templateUrl: './custom-form-input.component.html',
  styleUrls: ['./custom-form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormInputComponent),
      multi: true
    }
  ]
})
export class CustomFormInputComponent implements ControlValueAccessor {
  
  @Input() type!: string
  @Input() label!: string
  @Input() hideLabel: boolean = false
  @Input() containerClass!: string
  @Input() inputClass!: string
  @Input() placeholder: string = ''
  @Input() errors!: ValidationErrors | null
  
  isDisabled!: boolean
  isDirty: boolean = false
  input!: string

  onChange:any = () => {}
  onTouched:any = () => {}

  writeValue(input: any): void {
    this.input = input
    this.isDirty = false
  }

  registerOnChange(fn: any): void {
    this.onChange = (event:any) => {
      fn(event.target.value);
      this.isDirty = true;
    };
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

}
