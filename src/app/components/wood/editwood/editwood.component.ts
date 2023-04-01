import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fileUploadValidator } from 'src/app/helper/validateUploadFile';
import { Wood } from 'src/app/models/wood.model';
import { WoodService } from 'src/app/services/wood.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editwood',
  templateUrl: './editwood.component.html',
  styleUrls: ['./editwood.component.scss']
})
export class EditwoodComponent implements OnInit {
  woodId: string = ''
  defaultImgUrl!:string
  img_url: any = ''
  
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];

  editWoodForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    detail: ['', Validators.required],
    image: [
      { value: '', disabled: false },
      [fileUploadValidator(this.allowedFileExtensions)]
    ],
    advantage: ['', Validators.required],
    defect: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private woodService: WoodService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.woodId = this.route.snapshot.paramMap.get('id')!;

    // Lấy ra loại gỗ cần edit
    this.woodService.getWood(this.woodId).subscribe(res => {
      this.editWoodForm.controls['name'].setValue(res.name);
      this.editWoodForm.controls['description'].setValue(res.description);
      this.editWoodForm.controls['detail'].setValue(res.detail);
      this.editWoodForm.controls['advantage'].setValue(res.advantage);
      this.editWoodForm.controls['defect'].setValue(res.defect);
      this.defaultImgUrl = res.image
    })
  }

  public receiveImgUrl(event:any) {
    this.img_url = event
  }

  public saveChange() {
    const data: Wood =  {
      name: this.editWoodForm.controls.name.value!,
      image: this.img_url,
      description: this.editWoodForm.controls.description.value!,
      detail: this.editWoodForm.controls.detail.value!,
      advantage: this.editWoodForm.controls.advantage.value!,
      defect: this.editWoodForm.controls.defect.value!,
    }

    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn thay đổi loại gỗ này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Thay đổi',
      confirmButtonColor: '#1a56db',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.woodService.updateWood(this.woodId, data).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
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
    })
  }
}
