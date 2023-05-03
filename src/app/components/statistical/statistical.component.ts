import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Order_Detail } from 'src/app/models/order.model';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CommentService } from 'src/app/services/comment.service';

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

  p: number = 1;
  itemsPerPage: number = 5;

  data!: {
    customers: number,
    products: number,
    orders: number
  }

  quantityStar!: {
    one_star: number,
    two_star: number,
    three_star: number,
    four_star: number,
    five_star: number,
  }

  rating1 = 1;
  rating2 = 2;
  rating3 = 3;
  rating4 = 4;
  rating5 = 5;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private commentService: CommentService,
  ) {
    this.dateForm.get('to')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.dateForm.get('from')?.value) {
          const to = new Date(val);
          const from = new Date(this.dateForm.get('from')?.value!);

          if (to < from) {
            this.dateForm.get('to')?.setErrors({toDateInvalid: true})
          }
        }
      }
    })

    this.dateForm.get('from')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.dateForm.get('to')?.value) {
          const from = new Date(val);
          const to = new Date(this.dateForm.get('to')?.value!);

          if (from > to) {
            this.dateForm.get('from')?.setErrors({fromDateInvalid: true})
          }
        }
      }
    })
  }

  ngOnInit(): void {}

  public statis() {
    this.statisList = []
    this.revenue = 0
    let from = this.dateForm.controls.from.value!;
    let to = this.dateForm.controls.to.value!;
    this.invoiceService.analysis(from, to).subscribe(res => {
      this.data = res
    }) 
    this.commentService.analysis(from,to).subscribe(res => {
      this.quantityStar = res
    })
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
