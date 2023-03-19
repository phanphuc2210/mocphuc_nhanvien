import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/models/productType.model';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listtype',
  templateUrl: './listtype.component.html',
  styleUrls: ['./listtype.component.scss']
})
export class ListtypeComponent implements OnInit {
  typeList!: ProductType[]

  constructor(private typeService: TypeService) {}

  ngOnInit(): void {
    this.typeService.getProductTypes().subscribe(res => {
      this.typeList = res
    })
  }

  public deleteType(id: any) {
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
        this.typeService.deleteType(id).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
            this.typeList = this.typeList.filter(type => type.id !== id)
          },
          error: err => {
            Swal.fire({
              background: '#000',
              icon: 'error',
              title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
          }
        })
      }
    })
  }
}
