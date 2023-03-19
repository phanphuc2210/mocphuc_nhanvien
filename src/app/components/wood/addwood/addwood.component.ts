import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { fileUploadValidator } from 'src/app/helper/validateUploadFile';
import { Wood } from 'src/app/models/wood.model';
import { WoodService } from 'src/app/services/wood.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addwood',
  templateUrl: './addwood.component.html',
  styleUrls: ['./addwood.component.scss']
})
export class AddwoodComponent {
  img_url: any = '';
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];

  addWoodForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: [
      { value: '', disabled: false },
      [fileUploadValidator(this.allowedFileExtensions), Validators.required]
    ],
    advantage: ['', Validators.required],
    defect: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private woodService: WoodService) {}

  public receiveImgUrl(event:any) {
    this.img_url = event
  }

  public saveNew() {
    const data: Wood =  {
      name: this.addWoodForm.controls.name.value!,
      image: this.img_url,
      description: this.addWoodForm.controls.description.value!,
      advantage: this.addWoodForm.controls.advantage.value!,
      defect: this.addWoodForm.controls.defect.value!,
    }

    this.woodService.addWood(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm loại gỗ thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.addWoodForm.reset({});
      },
      error: err => {
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
      }
    })
  }
}
