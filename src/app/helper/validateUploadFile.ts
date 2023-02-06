import { AbstractControl, ValidatorFn } from "@angular/forms";

export function fileUploadValidator(allowedExtensions: any): ValidatorFn {
    console.log('inside validation');
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      // Enter to validation only if has value or it's not undefined
      if (control.value !== undefined && isNaN(control.value)) {
        const file = control.value;
        // Get extension from file name
        const ext = file.substring(file.lastIndexOf('.') + 1);
        // Find extension file inside allowed extensions array
        if (allowedExtensions.includes(ext.toLowerCase())) {
        } else {
          return { extensionFile: true };
        }
      }
      return null;
    };
}