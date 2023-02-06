import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  preview_img: any = '';
  isLoadingPreviewImg: boolean = false;
  productTypes: ProductType[] = [];
  // Array of valid extensions
  allowedFileExtensions = ['jpg', 'jpeg', 'png'];
  submitted = false;

  editProductForm = this.fb.group({
    name: [''],
    type: [''],
    quantity: [''],
    price: [''],
    description: [''],
    image: [''],
    fileSource: ['']
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
    this.productService.getProductTypes().subscribe(res => {
      this.productTypes = res.result;
    });

    // Lấy ra sản phẩm cần edit
    this.productService.getProduct(this.productId).subscribe(res => {
      this.editProductForm = this.fb.group({
        name: [res.result[0].name, Validators.required],
        type: [String(res.result[0].typeId), Validators.required],
        quantity: [String(res.result[0].quantity), Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/i) 
        ])],
        price: [String(res.result[0].price), Validators.required],
        description: [res.result[0].description, Validators.required],
        image: [
          { value: '', disabled: false },
          [fileUploadValidator(this.allowedFileExtensions)]
        ],
        fileSource: ['' ]
      });
  
      this.preview_img = res.result[0].image;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProductsAction.setErrorNull())
  }

  public previewImage(e:any) {
    this.isLoadingPreviewImg = true
    if(!this.editProductForm.controls.image.errors) {
      const file = e.target.files[0];

      this.editProductForm.patchValue({
        fileSource: file
      });

      const formData = new FormData();

      formData.append('file', this.editProductForm.controls.fileSource.value!);
      this.productService.uploadImage(formData).subscribe(res => {
        console.log(res)
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

  public saveChange() {
    const data: Product =  {
      name: this.editProductForm.controls.name.value!,
      typeId: Number(this.editProductForm.controls.type.value!),
      quantity: Number(this.editProductForm.controls.quantity.value!),
      image: this.preview_img,
      price: Number(this.editProductForm.controls.price.value!),
      description: this.editProductForm.controls.description.value!
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
        // this.productService.updateProduct(this.productId,data).subscribe(res => {
        //   Swal.fire({
        //     background: '#000',
        //     icon: 'success',
        //     title: '<p class="text-xl text-slate-300">Thay đổi thành công</p>',
        //     confirmButtonText: 'Ok',
        //     confirmButtonColor: '#0e9f6e',
        //   })
        // })

        this.store.dispatch(ProductsAction.editProduct({productId: this.productId, product: data}))
      }
    })
  }
}
