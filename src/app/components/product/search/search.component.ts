import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  types: ProductType[] = []
  products: Product[] = []
  searchForm = this.fb.group({
    name: [''],
    type: [''],
    priceFrom: [''],
    priceTo: ['']
  })

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productService.getProductTypes().subscribe(res => {
      this.types = res.result
    })
  }

  public searchProduct() {
    const name = this.searchForm.controls.name.value!
    const type = this.searchForm.controls.type.value!
    const priceFrom = this.searchForm.controls.priceFrom.value!
    const priceTo = this.searchForm.controls.priceTo.value!
    this.productService.searchProduct(name, type, priceFrom, priceTo).subscribe(res => {
      this.products = res.result
    })
  }
}
