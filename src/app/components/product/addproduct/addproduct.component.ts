import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { fileUploadValidator } from 'src/app/helper/validateUploadFile';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import * as ProductsAction from 'src/app/store/productStore/action'
import { Observable } from 'rxjs';
import { errorSelector } from 'src/app/store/productStore/selectors';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit, OnDestroy{
  error$!: Observable<string | undefined>

  img_url: any = '';
  productTypes: ProductType[] = [];
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];

  addProductForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    quantity: ['', Validators.compose([
      Validators.required,
      Validators.max(50)
    ])],
    price: ['', Validators.required],
    description: ['', Validators.required],
    image: [
      { value: '', disabled: false },
      [fileUploadValidator(this.allowedFileExtensions), Validators.required]
    ]
  });

  constructor(private productService: ProductService, private fb: FormBuilder, private store: Store<AppStateInterface>) {
    this.error$ = this.store.pipe(select(errorSelector))
  }
  
  ngOnInit(): void {
    this.productService.getProductTypes().subscribe(res => {
      this.productTypes = res.result;
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProductsAction.setErrorNull())
  }

  public receiveImgUrl(event:any) {
    this.img_url = event
  }

  public saveNew() {
    console.log("Add product form:", this.addProductForm.value)
    const product: Product =  {
      name: this.addProductForm.controls.name.value!,
      typeId: Number(this.addProductForm.controls.type.value!),
      quantity: Number(this.addProductForm.controls.quantity.value!),
      price: Number(this.addProductForm.controls.price.value!),
      image: this.img_url,
      description: this.addProductForm.controls.description.value!
    }

    this.store.dispatch(ProductsAction.addProduct({product}))

    this.addProductForm.reset({});
  }

}
