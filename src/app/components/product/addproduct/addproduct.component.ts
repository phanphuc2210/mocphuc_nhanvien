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

  preview_img: any = '';
  isLoadingPreviewImg: boolean = false;
  productTypes: ProductType[] = [];
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];
  submitted = false;

  addProductForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    quantity: ['', Validators.compose([
      Validators.required,
      Validators.pattern(/^[0-9]+$/i)
    ])],
    price: ['', Validators.required],
    description: ['', Validators.required],
    image: [
      { value: '', disabled: false },
      [fileUploadValidator(this.allowedFileExtensions), Validators.required]
    ],
    fileSource: ['', Validators.required]
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

  public previewImage(e:any) {
    this.isLoadingPreviewImg = true
    if(!this.addProductForm.controls.image.errors) {
      const file = e.target.files[0];

      this.addProductForm.patchValue({
        fileSource: file
      });

      const formData = new FormData();

      formData.append('file', this.addProductForm.controls.fileSource.value!);
      this.productService.uploadImage(formData).subscribe(res => {
        this.preview_img = res.result
        this.isLoadingPreviewImg = false;
        // alert('Uploaded Successfully.');
      })

      // const reader = new FileReader()
      // reader.addEventListener("load", () => {
      //   // convert image file to base64 string
      //   this.preview_img = reader.result
      //   }, false
      // )

      // if(file) {
      //     reader.readAsDataURL(file);
      // }
    }

    
  }

  public saveNew() {
    const product: Product =  {
      name: this.addProductForm.controls.name.value!,
      typeId: Number(this.addProductForm.controls.type.value!),
      quantity: Number(this.addProductForm.controls.quantity.value!),
      price: Number(this.addProductForm.controls.price.value!),
      image: this.preview_img,
      description: this.addProductForm.controls.description.value!
    }

    this.store.dispatch(ProductsAction.addProduct({product}))

    // this.productService.addNewProduct(product).subscribe(res => {
    //   console.log(res)
    //   Swal.fire({
    //     background: '#000',
    //     icon: 'success',
    //     title: '<p class="text-xl text-slate-300">Thêm thành công</p>',
    //     confirmButtonText: 'Ok',
    //     confirmButtonColor: '#0e9f6e',
    //   })
    // })
    this.addProductForm.reset();
    this.preview_img = '';
  }

}
