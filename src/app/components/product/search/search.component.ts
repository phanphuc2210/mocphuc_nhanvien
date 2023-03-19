import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  types$!: Observable<ProductType[]>;
  products$!: Observable<Product[]>;
  priceFromArr = [
    { value: '50000', price: '50.000' },
    { value: '100000', price: '100.000' },
    { value: '200000', price: '200.000' },
    { value: '300000', price: '300.000' },
    { value: '400000', price: '400.000' },
  ];
  priceToArr = [
    { value: '400000', price: '400.000' },
    { value: '500000', price: '500.000' },
    { value: '600000', price: '600.000' },
    { value: '700000', price: '700.000' },
    { value: '800000', price: '800.000' },
    { value: '900000', price: '900.000' },
    { value: '1000000', price: '1.000.000' },
    { value: '2000000', price: '2.000.000' },
  ];

  searchForm = this.fb.group({
    name: [''],
    type: [''],
    priceFrom: [''],
    priceTo: [''],
  });

  constructor(
    private productService: ProductService,
    private typeService: TypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.types$ = this.typeService.getProductTypes();
  }

  public searchProduct() {
    const name = this.searchForm.controls.name.value!;
    const type = this.searchForm.controls.type.value!;
    const priceFrom = this.searchForm.controls.priceFrom.value!;
    const priceTo = this.searchForm.controls.priceTo.value!;
    this.products$ = this.productService.searchProduct(
      name,
      type,
      priceFrom,
      priceTo
    );
  }
}
