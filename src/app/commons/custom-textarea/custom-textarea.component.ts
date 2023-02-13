import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: ['./custom-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextareaComponent),
      multi: true
    }
  ]
})
export class CustomTextareaComponent implements ControlValueAccessor {
  @Input() label!: string
  @Input() rows!: string
  @Input() cols!: string
  @Input() containerClass!: string
  @Input() textareaClass!: string
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
