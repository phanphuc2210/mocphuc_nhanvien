import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-custom-text-rich',
  templateUrl: './custom-text-rich.component.html',
  styleUrls: ['./custom-text-rich.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextRichComponent),
      multi: true
    }
  ]
})
export class CustomTextRichComponent implements ControlValueAccessor {
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

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Calibri',
    toolbarHiddenButtons: [
      ['fontName', 'subscript','superscript',],
      ['fontSize','textColor','backgroundColor', 'link', 'unlink', 'insertVideo', 'removeFormat']
    ]
  };

  writeValue(input: any): void {
    this.input = input
    this.isDirty = false
  }

  registerOnChange(fn: any): void {
    this.onChange = (event:any) => {
      fn(event);
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
