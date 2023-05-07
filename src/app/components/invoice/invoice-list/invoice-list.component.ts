import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { PaymentMethod } from 'src/app/models/paymentMethod.model';
import { Status } from 'src/app/models/status.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { PaymentmethodService } from 'src/app/services/paymentmethod.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  invoices$!: Observable<Order[]>;
  paymemts$!: Observable<PaymentMethod[]>;
  status$!: Observable<Status[]>;
  p: number = 1;
  itemsPerPage: number = 8;

  // Lọc hóa đơn
  searchForm = this.fb.group({
    from: [''],
    to: [''],
    payment: [''],
    status: [''],
  });

  constructor(
    private invoiceService: InvoiceService,
    private fb: FormBuilder,
    private paymentMethodService: PaymentmethodService,
    private statusService: StatusService
  ) {
    this.searchForm.get('to')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.searchForm.get('from')?.value) {
          const to = new Date(val);
          const from = new Date(this.searchForm.get('from')?.value!);

          if (to < from) {
            this.searchForm.get('to')?.setErrors({toDateInvalid: true})
          }
        }
      }
    })

    this.searchForm.get('from')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.searchForm.get('to')?.value) {
          const from = new Date(val);
          const to = new Date(this.searchForm.get('to')?.value!);

          if (from > to) {
            this.searchForm.get('from')?.setErrors({fromDateInvalid: true})
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.invoices$ = this.invoiceService.getList();
    this.paymemts$ = this.paymentMethodService.getPaymentMethodList();
    this.status$ = this.statusService.getStatusList();
  }

   // Lọc hóa đơn
   public searchInvoice() {
    const from = this.searchForm.controls.from.value!;
    const to = this.searchForm.controls.to.value!;
    const payment = this.searchForm.controls.payment.value!;
    const status = this.searchForm.controls.status.value!;
    this.invoices$ = this.invoiceService.getList(
      from, to, payment, status
    );
  }

  reset() {
    this.searchForm.get('from')?.setValue('');
    this.searchForm.get('to')?.setValue('');
    this.searchForm.get('payment')?.setValue('');
    this.searchForm.get('status')?.setValue('');
    this.invoices$ = this.invoiceService.getList();
  }
}
