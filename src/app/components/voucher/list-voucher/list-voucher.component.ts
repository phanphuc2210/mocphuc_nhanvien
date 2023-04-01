import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { ProductType } from 'src/app/models/productType.model';
import { FormBuilder, Validators } from '@angular/forms';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-voucher',
  templateUrl: './list-voucher.component.html',
  styleUrls: ['./list-voucher.component.scss'],
})
export class ListVoucherComponent implements OnInit {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  voucherList$!: Observable<Voucher[]>;
  p:number = 1;
  itemsPerPage:number = 8;

  // Cấu hình form thêm/sửa
  productTypes$!: Observable<ProductType[]>;
  voucherId!: number;

  voucherForm = this.fb.group({
    code: ['', Validators.required],
    discount: ['', Validators.required],
    release_date: ['', Validators.required],
    expiration_date: ['', Validators.required],
    applicable_productType: ['', Validators.required],
    bill_from: ['', Validators.required],
    quantity: [
      '',
      Validators.compose([Validators.required, Validators.max(50)]),
    ],
  });

  // Flowbite config
  titileModal = 'Thêm mới'
  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  constructor(
    private voucherService: VoucherService,
    private typeService: TypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.voucherList$ = this.voucherService.getVoucherList();
    this.productTypes$ = this.typeService.getProductTypes();

    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  setValueForControls(data?: Voucher) {
    this.voucherForm.controls['code'].setValue(data? data.code! : '')
    if(data) {
      this.voucherForm.controls['code'].disable()
    } else {
      this.voucherForm.controls['code'].enable()
    }
    this.voucherForm.controls['discount'].setValue(data? String(data.discount) : '')
    this.voucherForm.controls['release_date'].setValue(data? new Date(data.release_date).toLocaleDateString('sv') : '')
    this.voucherForm.controls['expiration_date'].setValue(data? new Date(data.expiration_date).toLocaleDateString('sv') : '')
    this.voucherForm.controls['applicable_productType'].setValue(data? String(data.applicable_productType) : '')
    this.voucherForm.controls['bill_from'].setValue(data? String(data.bill_from) : '')
    this.voucherForm.controls['quantity'].setValue(data? String(data.quantity) : '')
  }

  setValueForForm(voucherId?: number) {
    if(voucherId) {
      this.voucherId = voucherId;
      this.voucherService.getVoucher(voucherId).subscribe(res => {
        this.setValueForControls(res);
      })
    } else {
      this.setValueForControls();
    }
  }

  showModal(voucherId?: number) {
    this.titileModal = voucherId? 'Cập nhật' : 'Thêm mới';
    this.setValueForForm(voucherId);
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  addVoucher(data: Voucher) {
    this.voucherService.addVoucher(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm Voucher mới thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.hideModal();
        this.voucherList$ = this.voucherService.getVoucherList();
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

  editVoucher(data: Voucher) {
    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn thay đổi Voucher này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Thay đổi',
      confirmButtonColor: '#1a56db',
    }).then((result) => {
      if (result.isConfirmed) {
        this.voucherService.updateVoucher(String(this.voucherId),data).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">Cập nhật Voucher thành công</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
            this.hideModal();
            this.voucherList$ = this.voucherService.getVoucherList();
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
    const data: Voucher =  {
      code: this.voucherForm.controls.code.value!,
      discount: Number(this.voucherForm.controls.discount.value!),
      release_date: this.voucherForm.controls.release_date.value!,
      expiration_date: this.voucherForm.controls.expiration_date.value!,
      applicable_productType: Number(this.voucherForm.controls.applicable_productType.value!),
      bill_from: Number(this.voucherForm.controls.bill_from.value!),
      quantity: Number(this.voucherForm.controls.quantity.value!),
    }

    if(this.titileModal === 'Thêm mới') {
      this.addVoucher(data)
    } else {
      this.editVoucher(data)
    }
  }
}
