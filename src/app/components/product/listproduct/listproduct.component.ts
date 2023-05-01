import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { Comment } from 'src/app/models/comment.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import * as ProductsAction from 'src/app/store/productStore/action';
import { Observable } from 'rxjs';
import {
  errorSelector,
  isLoadingSelector,
  productsByTypeIdSelector,
  productsSelector,
} from 'src/app/store/productStore/selectors';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { TypeService } from 'src/app/services/type.service';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { fileUploadValidator } from 'src/app/helper/validateUploadFile';
import { Wood } from 'src/app/models/wood.model';
import { WoodService } from 'src/app/services/wood.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss'],
})
export class ListproductComponent implements OnInit, OnDestroy {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  @ViewChild('commentEl', {
    read: ElementRef,
    static: true,
  })
  commentEl!: ElementRef<HTMLDivElement>;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | undefined>;
  products$!: Observable<Product[] | any>;

  // products: Product[] = [];
  types!: ProductType[];
  classify: string = '';
  p: number = 1;
  itemsPerPage: number = 8;

  // Flowbite config
  modal!: ModalInterface;
  commentMd!: ModalInterface;
  titileModal = 'Thêm mới'

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  img_url: any = [];
  woodTypes$!: Observable<Wood[]>;

  // Cấu hình form thêm/sửa
   // Array of valid extensions
   allowedFileExtensions = ['jpg', 'jpeg', 'png'];

   isAdd = true
   defaultImgUrl!:string[]
   productId!: number;
   productForm = this.fb.group({
     name: ['', Validators.required],
     type: ['', Validators.required],
     wood: ['', Validators.required],
     quantity: [
       '',
       Validators.compose([Validators.required, Validators.max(50)]),
     ],
     length: ['', Validators.required],
     width: ['', Validators.required],
     height: ['', Validators.required],
     price: ['', Validators.required],
     description: ['', Validators.required],
     images: this.fb.array([
       this.fb.control(
         '',
         Validators.compose([
           fileUploadValidator(this.allowedFileExtensions),
           Validators.required,
         ])
       ),
     ]),
   });
 
   get images(): FormArray {
     return this.productForm.get('images') as FormArray;
   }
 
   addImage() {
     this.images.push(
       this.fb.control(
         '',
         Validators.compose([
           fileUploadValidator(this.allowedFileExtensions),
           Validators.required,
         ])
       )
     );
   }
 
   removeImage(index: number) {
    this.images.removeAt(index);
    this.img_url.splice(index, 1);
    this.defaultImgUrl = [...this.img_url]
   }

  //  Comment
  commentList$!: Observable<Comment[]>
  product!: Product;
  starLabel = [
    'Vui lòng đánh giá',
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Cực kì hài lòng',
  ];

  // Search
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
    wood: [''],
    priceFrom: [''],
    priceTo: [''],
  });

  constructor(
    private productService: ProductService,
    private woodService: WoodService,
    private typeService: TypeService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.products$ = this.store.pipe(select(productsSelector));
  }

  ngOnInit(): void {
    this.typeService.getProductTypes().subscribe(res => {
      this.types = res.filter(val => val.active === 1);
    });
    this.woodTypes$ = this.woodService.getWoodList();

    this.store.dispatch(ProductsAction.getProducts());
    // Thiết lập hộp thoại cập nhật trạng thái
    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
    this.commentMd = new Modal(this.commentEl.nativeElement, this.modalOptions);
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProductsAction.setErrorNull());
  }

  // phân loại sản phẩm
  public productClassification() {
    // this.productService.getAllProducts(this.classify).subscribe(res => {
    //   this.products = res.result;
    //   this.p = 1;
    //   this.totalProduct = this.products.length;
    // })

    this.products$ = this.store.pipe(
      select(productsByTypeIdSelector(this.classify))
    );
    this.p = 1;
  }

  public receiveImgUrl(event: any, index: number) {
    this.img_url[index] = event;
  }

  setValueForControls(data?: Product) {
    this.productForm.controls['name'].setValue(data? data.name : '');
    this.productForm.controls['type'].setValue(data? String(data.typeId) : '');
    this.productForm.controls['wood'].setValue(data? String(data.woodId) : '');
    this.productForm.controls['quantity'].setValue(data? String(data.quantity) : '');
    this.productForm.controls['price'].setValue(data? String(data.price) : '');
    this.productForm.controls['length'].setValue(data? String(data.length) : '');
    this.productForm.controls['width'].setValue(data? String(data.width) : '');
    this.productForm.controls['height'].setValue(data? String(data.height): '');
    this.productForm.controls['description'].setValue(data? data.description : '');
    if(data) {
      // Cấu hình cho nhiều hình ảnh
      this.images.clear()
      this.defaultImgUrl = data.image
      this.defaultImgUrl.forEach((url) => {
        this.images.push(this.fb.control(
          '', Validators.compose([
            fileUploadValidator(this.allowedFileExtensions)
          ])
        ));
      })
      this.img_url = [...this.defaultImgUrl]
    } else {
      this.images.clear()
      this.images.push(this.fb.control(
        '', Validators.compose([
          fileUploadValidator(this.allowedFileExtensions)
        ])
      ));
      this.defaultImgUrl = []
      this.img_url = []
    }
  }

  setValueForForm(productId?: number) {
    if(productId) {
      this.productId = productId;
      this.productService.getProduct(String(productId)).subscribe(res => {
        this.setValueForControls(res);
      })
    } else {
      this.setValueForControls();
    }
  }

  showModal(productId?: number) {
    this.titileModal = productId? 'Cập nhật' : 'Thêm mới';
    this.isAdd = productId? false : true;
    this.setValueForForm(productId);
    this.modal.show();
  }

  showComment(productId: number) {
    this.commentList$ = this.commentService.getComments(productId);
    this.productService.getProduct(String(productId)).subscribe(res => {
      this.product = res
    })
    this.commentMd.show();
  }

  hideModal() {
    this.modal.hide();
  }

  hideComment() {
    this.commentMd.hide();
  }

  public saveNew() {
    const product: Product = {
      name: this.productForm.controls.name.value!,
      typeId: Number(this.productForm.controls.type.value!),
      woodId: Number(this.productForm.controls.wood.value!),
      quantity: Number(this.productForm.controls.quantity.value!),
      price: Number(this.productForm.controls.price.value!),
      length: Number(this.productForm.controls.length.value!),
      width: Number(this.productForm.controls.width.value!),
      height: Number(this.productForm.controls.height.value!),
      image: this.img_url,
      description: this.productForm.controls.description.value!,
    };

    if(this.isAdd) {
      this.store.dispatch(ProductsAction.addProduct({ product }));
      this.hideModal();
    } else {
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
          this.store.dispatch(ProductsAction.editProduct({productId: String(this.productId), product: product}))
          this.hideModal();
        }
      })
    }
  }

  public deleteProduct(id: number) {
    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn xóa sản phẩm này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#c81e1e',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // this.productService.deleteProduct(String(id)).subscribe(res => {
        //     Swal.fire({
        //       background: '#000',
        //       icon: 'success',
        //       title: '<p class="text-xl text-slate-300">Xóa thành công</p>',
        //       confirmButtonText: 'Ok',
        //       confirmButtonColor: '#1a56db',
        //     })
        //     this.products = this.products.filter(product => product.id != id);
        // })
        this.store.dispatch(ProductsAction.removeProduct({productId: String(id)}))
      }
    })
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

  // Lọc sản phẩm
  public searchProduct() {
    const name = this.searchForm.controls.name.value!;
    const type = this.searchForm.controls.type.value!;
    const wood = this.searchForm.controls.wood.value!;
    const priceFrom = this.searchForm.controls.priceFrom.value!;
    const priceTo = this.searchForm.controls.priceTo.value!;
    this.products$ = this.productService.searchProduct(
      name,
      type,
      wood,
      priceFrom,
      priceTo
    );
  }
}
