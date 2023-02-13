import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-custom-number-input',
  templateUrl: './custom-number-input.component.html',
  styleUrls: ['./custom-number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomNumberInputComponent),
      multi: true
    }
  ]
})
export class CustomNumberInputComponent implements ControlValueAccessor {
  @Input() label!: string
  @Input() placeholder!: string
  @Input() align: string = ''
  @Input() prefix: string = ''
  @Input() suffix: string = ''
  @Input() precision: number = 0
  @Input() thousands: string = ''
  @Input() containerClass!: string
  @Input() inputClass!: string
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
      fn(this.input);
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
