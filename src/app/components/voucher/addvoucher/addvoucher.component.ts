import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/models/productType.model';
import { Voucher } from 'src/app/models/voucher.model';
import { TypeService } from 'src/app/services/type.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addvoucher',
  templateUrl: './addvoucher.component.html',
  styleUrls: ['./addvoucher.component.scss']
})
export class AddvoucherComponent implements OnInit {
  productTypes$!: Observable<ProductType[]>;

  addVoucherForm = this.fb.group({
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
  })
  
  constructor(private fb: FormBuilder, private typeService: TypeService, private voucherService: VoucherService) {}

  ngOnInit(): void {
    this.productTypes$ = this.typeService.getProductTypes();
  }

  public saveNew() {
    const data: Voucher =  {
      code: this.addVoucherForm.controls.code.value!,
      discount: Number(this.addVoucherForm.controls.discount.value!),
      release_date: this.addVoucherForm.controls.release_date.value!,
      expiration_date: this.addVoucherForm.controls.expiration_date.value!,
      applicable_productType: Number(this.addVoucherForm.controls.applicable_productType.value!),
      bill_from: Number(this.addVoucherForm.controls.bill_from.value!),
      quantity: Number(this.addVoucherForm.controls.quantity.value!),
    }

    this.voucherService.addVoucher(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm Voucher mới thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.addVoucherForm.reset({});
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
