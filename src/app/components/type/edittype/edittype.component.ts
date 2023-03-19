import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { ProductType } from 'src/app/models/productType.model';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edittype',
  templateUrl: './edittype.component.html',
  styleUrls: ['./edittype.component.scss']
})
export class EdittypeComponent implements OnInit{
  parentTypes!: ProductType[]
  typeId: string = ''

  editTypeForm = this.fb.group({
    name: ['', Validators.required],
    parentId: [0, Validators.required],
    description: ['', Validators.required],
    active: [1, Validators.required]
  })

  constructor(private typeService: TypeService, private fb: FormBuilder, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.typeId = this.route.snapshot.paramMap.get('id')!;
    // Lấy loại sản phẩm cha
    this.typeService.getParentTypes().subscribe(res => {
      this.parentTypes = res.filter(type => type.id !== Number(this.typeId))
    })

    // Lấy ra loại gỗ cần edit
    this.typeService.getType(this.typeId).subscribe(res => {
      this.editTypeForm.controls['name'].setValue(res.name);
      this.editTypeForm.controls['description'].setValue(res.description);
      this.editTypeForm.controls['parentId'].setValue(res.parentId);
      this.editTypeForm.controls['active'].setValue(res.active);
    })
  }

  public changeCheckBoxvalue(event: any) {
    this.editTypeForm.controls['active'].setValue(event.target.value);
  }

  public saveChange() {
    const data: ProductType =  {
      name: this.editTypeForm.controls.name.value!,
      description: this.editTypeForm.controls.description.value!,
      parentId: this.editTypeForm.controls.parentId.value!,
      active: this.editTypeForm.controls.active.value!,
    }

    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn thay đổi loại sản phẩm này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Thay đổi',
      confirmButtonColor: '#1a56db',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeService.updateType(this.typeId, data).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
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
