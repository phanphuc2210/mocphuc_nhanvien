import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Wood } from 'src/app/models/wood.model';
import { WoodService } from 'src/app/services/wood.service';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormBuilder, Validators } from '@angular/forms';
import { fileUploadValidator } from 'src/app/helper/validateUploadFile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listwood',
  templateUrl: './listwood.component.html',
  styleUrls: ['./listwood.component.scss']
})
export class ListwoodComponent implements OnInit {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  woodList$!: Observable<Wood[]>
  p:number = 1;
  itemsPerPage:number = 8;

  // Cấu hình form thêm/sửa
  img_url: any = '';
  woodId!: number;
  defaultImgUrl!:string
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];

  woodForm = this.fb.group({
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

  // Flowbite config
  titileModal = 'Thêm mới'
  isAdd = true
  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  constructor(private woodService: WoodService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.woodList$ = this.woodService.getWoodList()

    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  public receiveImgUrl(event:any) {
    this.img_url = event
  }

  setValueForControls(data?: Wood) {
    this.woodForm.controls['name'].setValue(data? data.name : '');
    this.woodForm.controls['description'].setValue(data? data.description : '');
    this.woodForm.controls['detail'].setValue(data? data.detail : '');
    this.woodForm.controls['advantage'].setValue(data? data.advantage : '');
    this.woodForm.controls['defect'].setValue(data? data.defect : '');
    if(data) {
      this.defaultImgUrl = data.image
      this.img_url = data.image
    } else {
      this.defaultImgUrl = ''
      this.img_url = ''
    }
  }

  setValueForForm(woodId?: number) {
    if(woodId) {
      this.woodId = woodId;
      this.woodService.getWood(String(woodId)).subscribe(res => {
        this.setValueForControls(res);
      })
    } else {
      this.setValueForControls();
    }
  }

  showModal(woodId?: number) {
    this.titileModal = woodId? 'Cập nhật' : 'Thêm mới';
    this.isAdd = woodId? false : true;
    this.setValueForForm(woodId);
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  addWood(data: Wood) {
    this.woodService.addWood(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm loại gỗ thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.hideModal();
        this.woodList$ = this.woodService.getWoodList()
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

  editWood(data: Wood) {
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
        this.woodService.updateWood(String(this.woodId), data).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
            this.hideModal();
            this.woodList$ = this.woodService.getWoodList()
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

  public saveNew() {
    const data: Wood =  {
      name: this.woodForm.controls.name.value!,
      image: this.img_url,
      description: this.woodForm.controls.description.value!,
      detail: this.woodForm.controls.detail.value!,
      advantage: this.woodForm.controls.advantage.value!,
      defect: this.woodForm.controls.defect.value!,
    }

    if(this.isAdd) {
      this.addWood(data)
    } else {
      this.editWood(data)
    }
  }
}
