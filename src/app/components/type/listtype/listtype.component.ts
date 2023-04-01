import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/models/productType.model';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-listtype',
  templateUrl: './listtype.component.html',
  styleUrls: ['./listtype.component.scss']
})
export class ListtypeComponent implements OnInit {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  typeList!: ProductType[]

  // Cấu hình form thêm/sửa
  parentTypes!: ProductType[]
  typeId?: number

  typeForm = this.fb.group({
    name: ['', Validators.required],
    parentId: [0, Validators.required],
    description: ['', Validators.required],
    active: [1, Validators.required]
  })

  // Flowbite config
  titileModal = 'Thêm mới'
  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  constructor(private typeService: TypeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.typeService.getProductTypes().subscribe(res => {
      this.typeList = res
    })

    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  public changeCheckBoxvalue(event: any) {
    this.typeForm.controls['active'].setValue(event.target.value);
  }

  setValueForControls(data?: ProductType) {
    this.typeForm.controls['name'].setValue(data? data.name : '');
    this.typeForm.controls['description'].setValue(data? data.description : '');
    this.typeForm.controls['parentId'].setValue(data? data.parentId : 0);
    this.typeForm.controls['active'].setValue(data? data.active : 1);
  }

  setValueForForm(typeId?: number) {
    if(typeId) {
      this.typeId = typeId;
      // Lấy loại sản phẩm cha
      this.typeService.getParentTypes().subscribe(res => {
        this.parentTypes = res.filter(type => type.id !== typeId)
      })
      this.typeService.getType(String(typeId)).subscribe(res => {
        this.setValueForControls(res);
      })
    } else {
      this.typeService.getParentTypes().subscribe(res => {
        this.parentTypes = res
      })
      this.setValueForControls();
    }
  }

  showModal(typeId?: number) {
    this.titileModal = typeId? 'Cập nhật' : 'Thêm mới';
    this.setValueForForm(typeId);
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  addType(data: ProductType) {
    this.typeService.addType(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm loại sản phẩm mới thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.typeService.getProductTypes().subscribe(res => {
          this.typeList = res
        })
        this.hideModal();
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

  editType(data: ProductType) {
    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn thay đổi loại sản phẩm này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Thay đổi',
      confirmButtonColor: '#1a56db',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeService.updateType(String(this.typeId), data).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
            this.typeService.getProductTypes().subscribe(res => {
              this.typeList = res
            })
            this.hideModal();
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
    const data: ProductType =  {
      name: this.typeForm.controls.name.value!,
      description: this.typeForm.controls.description.value!,
      parentId: this.typeForm.controls.parentId.value!,
      active: this.typeForm.controls.active.value!,
    }

    if(this.titileModal === 'Thêm mới') {
      this.addType(data)
    } else {
      this.editType(data)
    }
  }

  public deleteType(id: any) {
    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn xóa sản phẩm này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#c81e1e',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeService.deleteType(id).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
            this.typeList = this.typeList.filter(type => type.id !== id)
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
