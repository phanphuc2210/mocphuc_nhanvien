import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, Order_Detail } from 'src/app/models/order.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import statusCode from 'src/app/constant/status';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  orderId!: string
  invoice_info!: Order
  invoice_details!: Order_Detail[]
  total_price: number = 0

  showUpdateStatusBtn: boolean = true
  nextStatus!: any
  updateStatusForm = this.fb.group({
    status: ['', Validators.required],
  })

  // Flowbite config
  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!

    // Lấy thông tin chi tiết hóa đơn
    this.setupOrderDetail()

    // Lấy ra trang thái tiếp theo
    this.setupStatus()

    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  setupOrderDetail() {
    this.invoiceService.getDetail(Number(this.orderId)).subscribe({
      next: res => {
        this.invoice_info = res.order
        this.invoice_details = res.order_details
        this.invoice_details.forEach(d => {
          this.total_price += d.price! * d.quantity
        })
        console.log('Invocie #' + this.orderId + ':', { invoice_info: this.invoice_info, invoice_details: this.invoice_details})
      },
      error: err => {
        console.log("Error invocie-detail:", err.error.message)
      }
    })
  }

  setupStatus() {
    this.updateStatusForm.controls['status'].disable()
    this.invoiceService.getNextStatus(Number(this.orderId)).subscribe(res => {
      this.nextStatus = res
      this.updateStatusForm.controls['status'].setValue(res.nextStatus)
      if(res.statusId === statusCode.Hoan_Thanh) {
        this.showUpdateStatusBtn = false
      }
    })
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  updateStatus() {
    const data: {orderId: number, nextStatus: number} = {
      orderId: Number(this.orderId),
      nextStatus: this.nextStatus.statusId
    }

    this.invoiceService.updateStatus(data).subscribe({
      next: res => {
        this.hideModal()

        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.setupOrderDetail()
        this.setupStatus()
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
