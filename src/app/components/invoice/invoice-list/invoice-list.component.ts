import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  invoices$!: Observable<Order[]>
  p:number = 1;
  itemsPerPage:number = 8;
  
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoices$ = this.invoiceService.getList()
  }

  
}
