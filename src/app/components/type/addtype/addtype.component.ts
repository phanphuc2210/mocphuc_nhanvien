import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/models/productType.model';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtype',
  templateUrl: './addtype.component.html',
  styleUrls: ['./addtype.component.scss']
})
export class AddtypeComponent implements OnInit {
  parentTypes$: Observable<ProductType[]>

  addTypeForm = this.fb.group({
    name: ['', Validators.required],
    parentId: [0, Validators.required],
    description: ['', Validators.required],
    active: [1, Validators.required]
  })

  constructor(private typeService: TypeService, private fb: FormBuilder) {
    this.parentTypes$ = typeService.getParentTypes()
  }

  ngOnInit(): void {
    
  }

  public changeCheckBoxvalue(event: any) {
    this.addTypeForm.controls['active'].setValue(event.target.value);
  }

  public saveNew() {
    const data: ProductType =  {
      name: this.addTypeForm.controls.name.value!,
      description: this.addTypeForm.controls.description.value!,
      parentId: this.addTypeForm.controls.parentId.value!,
      active: this.addTypeForm.controls.active.value!,
    }

    this.typeService.addType(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm loại sản phẩm mới thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.parentTypes$ = this.typeService.getParentTypes()
        this.addTypeForm.reset({});
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
}
