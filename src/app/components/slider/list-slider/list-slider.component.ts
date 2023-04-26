import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Slider } from 'src/app/models/slider.model';
import { SliderService } from 'src/app/services/slider.service';
import { ModalOptions, ModalInterface, Modal } from 'flowbite';
import { fileUploadValidator } from 'src/app/helper/validateUploadFile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-slider',
  templateUrl: './list-slider.component.html',
  styleUrls: ['./list-slider.component.scss']
})
export class ListSliderComponent implements OnInit{
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  sliderList$!: Observable<Slider[]>
  p:number = 1;
  itemsPerPage:number = 8;

  // Cấu hình form thêm/sửa
  img_url: any = '';
  sliderId!: number;
  defaultImgUrl!:string
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];

  sliderForm = this.fb.group({
    image: [
      { value: '', disabled: false },
      [fileUploadValidator(this.allowedFileExtensions)]
    ],
    linkto: ['', Validators.required],
    description: [''],
    active: [1, Validators.required],
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

  constructor(private sliderService: SliderService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sliderList$ = this.sliderService.getSliderList()

    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  public receiveImgUrl(event:any) {
    this.img_url = event
  }

  public changeCheckBoxvalue(event: any) {
    this.sliderForm.controls['active'].setValue(event.target.value);
  }

  setValueForControls(data?: Slider) {
    this.sliderForm.controls['linkto'].setValue(data? data.linkto : '');
    this.sliderForm.controls['description'].setValue(data? data.description : '');
    this.sliderForm.controls['active'].setValue(data? data.active : 1);
    if(data) {
      this.defaultImgUrl = data.image
      this.img_url = data.image
    } else {
      this.defaultImgUrl = ''
      this.img_url = ''
    }
  }

  setValueForForm(sliderId?: number) {
    if(sliderId) {
      this.sliderId = sliderId;
      this.sliderService.getSlider(String(sliderId)).subscribe(res => {
        this.setValueForControls(res);
      })
    } else {
      this.setValueForControls();
    }
  }

  showModal(sliderId?: number) {
    this.titileModal = sliderId? 'Cập nhật' : 'Thêm mới';
    this.isAdd = sliderId? false : true;
    this.setValueForForm(sliderId);
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  addSlider(data: Slider) {
    this.sliderService.addSlider(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm slide thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.hideModal();
        this.sliderList$ = this.sliderService.getSliderList()
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

  editSlider(data: Slider) {
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
        this.sliderService.updateSlider(String(this.sliderId), data).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
            this.hideModal();
            this.sliderList$ = this.sliderService.getSliderList()
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
    const data: Slider =  {
      image: this.img_url,
      linkto: this.sliderForm.controls.linkto.value!,
      description: this.sliderForm.controls.description.value!,
      active: this.sliderForm.controls.active.value!,
    }

    if(this.isAdd) {
      this.addSlider(data)
    } else {
      this.editSlider(data)
    }
  }
}
