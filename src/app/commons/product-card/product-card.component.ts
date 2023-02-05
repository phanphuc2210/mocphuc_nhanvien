import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { Product } from 'src/app/models/product.model';
import * as ProductsAction from "src/app/store/productStore/action";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    
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
}
