import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  error$!: Observable<string | undefined>

  productId: string = '';
  defaultImgUrl!:string
  img_url: any = ''
  productTypes$!: Observable<ProductType[]>
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];

  editProductForm = this.fb.group({
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
      [fileUploadValidator(this.allowedFileExtensions)]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {
    this.error$ = this.store.pipe(select(errorSelector))
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    // Lấy ra loại sản phẩm
    this.productTypes$ = this.productService.getProductTypes()

    // Lấy ra sản phẩm cần edit
    this.productService.getProduct(this.productId).subscribe(res => {
      this.editProductForm.controls['name'].setValue(res.name);
      this.editProductForm.controls['type'].setValue(String(res.typeId));
      this.editProductForm.controls['quantity'].setValue(String(res.quantity));
      this.editProductForm.controls['price'].setValue(String(res.price));
      this.editProductForm.controls['description'].setValue(res.description);
      this.defaultImgUrl = res.image
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProductsAction.setErrorNull())
  }

  // public previewImage(e:any) {
  //   this.isLoadingPreviewImg = true
  //   if(!this.editProductForm.controls['image'].errors) {
  //     const file = e.target.files[0];

  //     this.editProductForm.patchValue({
  //       fileSource: file
  //     });

  //     const formData = new FormData();

  //     formData.append('file', this.editProductForm.controls['fileSource'].value!);
  //     this.productService.uploadImage(formData).subscribe(res => {
  //       console.log(res)
  //       this.preview_img = res.result
  //       this.isLoadingPreviewImg = false;
  //       alert('Uploaded Successfully.');
  //     })

  //     const reader = new FileReader()
  //     reader.addEventListener("load", () => {
  //       // convert image file to base64 string
  //       this.preview_img = reader.result
  //       }, false
  //     )

  //     if(file) {
  //         reader.readAsDataURL(file);
  //     }
  //   }
  // }

  public receiveImgUrl(event:any) {
    this.img_url = event
  }

  public saveChange() {
    const data: Product =  {
      name: this.editProductForm.controls['name'].value!,
      typeId: Number(this.editProductForm.controls['type'].value),
      quantity: Number(this.editProductForm.controls['quantity'].value),
      image: this.img_url? this.img_url : this.defaultImgUrl,
      price: Number(this.editProductForm.controls['price'].value),
      description: this.editProductForm.controls['description'].value!
    }

    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn thay đổi sản phẩm này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Thay đổi',
      confirmButtonColor: '#1a56db',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.store.dispatch(ProductsAction.editProduct({productId: this.productId, product: data}))
      }
    })
  }
}
