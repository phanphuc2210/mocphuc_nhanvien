import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Order_Detail } from 'src/app/models/order.model';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CommentService } from 'src/app/services/comment.service';
import { ProductType } from 'src/app/models/productType.model';
import { TypeService } from 'src/app/services/type.service';
import { Observable } from 'rxjs';
import { Wood } from 'src/app/models/wood.model';
import { WoodService } from 'src/app/services/wood.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent implements OnInit {
  requestForm = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    type: [''],
    wood: [''],
  });

  types!: ProductType[];
  woodTypes$!: Observable<Wood[]>;

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
    private typeService: TypeService,
    private woodService: WoodService
  ) {
    this.requestForm.get('to')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.requestForm.get('from')?.value) {
          const to = new Date(val);
          const from = new Date(this.requestForm.get('from')?.value!);

          if (to < from) {
            this.requestForm.get('to')?.setErrors({toDateInvalid: true})
          }
        }
      }
    })

    this.requestForm.get('from')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.requestForm.get('to')?.value) {
          const from = new Date(val);
          const to = new Date(this.requestForm.get('to')?.value!);

          if (from > to) {
            this.requestForm.get('from')?.setErrors({fromDateInvalid: true})
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.typeService.getProductTypes().subscribe(res => {
      this.types = res.filter(val => val.active === 1);
    });
    this.woodTypes$ = this.woodService.getWoodList();
  }

  public statis() {
    this.statisList = []
    this.revenue = 0
    let from = this.requestForm.controls.from.value!;
    let to = this.requestForm.controls.to.value!;
    let type = this.requestForm.controls.type.value!;
    let wood = this.requestForm.controls.wood.value!;
    this.invoiceService.analysis(from, to,type, wood).subscribe(res => {
      this.data = res
    }) 
    this.commentService.analysis(from,to,type, wood).subscribe(res => {
      this.quantityStar = res
    })
    this.invoiceService.getStatis(from, to, type, wood).subscribe({
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
    this.p = 1;
  }

  quantityChildren(typeId: number): number {
    let quantity = 0;
    this.types.forEach(type => {
      if(type.parentId === typeId) {
        quantity++;
      }
    });

    return quantity;
  }
}
