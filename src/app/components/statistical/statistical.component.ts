import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Order_Detail } from 'src/app/models/order.model';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent implements OnInit {
  dateForm = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
  });
  statisList!: Order_Detail[];
  product!: Product
  revenue: number = 0;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  public statis() {
    this.statisList = []
    this.revenue = 0
    let from = this.dateForm.controls.from.value!;
    let to = this.dateForm.controls.to.value!;
    this.invoiceService.getStatis(from, to).subscribe({
      next: (res) => {
        let statis: Order_Detail[] = res;
        statis.forEach((s) => {
          this.productService.getProduct(String(s.productId)).subscribe(res => {
            this.product = res
            let data: Order_Detail = {
              productId: this.product.id,
              name: this.product.name,
              image: this.product.image,
              price: this.product.price,
              quantity: s.quantity
            }
            this.revenue += this.product.price * s.quantity
            this.statisList.push(data)
          })
        });
      },
      error: err => {
        console.log("Error statistical: ", err.error.message)
      }
    });
  }
}
