import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit{
  title:string = ''
  users$!: Observable<User[]>
  role!: string
  p:number = 1;
  itemsPerPage:number = 8;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      param =>{
        this.role = param['role']
        console.log(this.role)
        if(this.role === 'customer') {
          this.title = 'Danh sách khách hàng'
        } else {
          this.title = 'Danh sách nhân viên'
        }
        this.users$ = this.userService.getAllUsers(this.role)
      }
    );
  }

  // public deleteUser(id: number) {
  //   Swal.fire({
  //     title: '<p class="text-xl text-slate-300">Bạn thật sự muốn xóa người dùng này?</p>',
  //     background: '#000',
  //     showCancelButton: true,
  //     cancelButtonText: 'Hủy',
  //     confirmButtonText: 'Xóa',
  //     confirmButtonColor: '#c81e1e',
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       const userId = localStorage.getItem('userId');
  //       if(userId !== String(id)) {
  //         this.userService.deleteUser(String(id)).subscribe(res => {
  //           Swal.fire({
  //             background: '#000',
  //             icon: 'success',
  //             title: '<p class="text-xl text-slate-300">Xóa thành công</p>',
  //             confirmButtonText: 'Ok',
  //             confirmButtonColor: '#1a56db',
  //           })
  //           this.users = this.users.filter(user => user.id != id);
  //           this.totalUser = this.users.length;
  //         })
  //       } else {
  //         Swal.fire({
  //           background: '#000',
  //           icon: 'error',
  //           title: '<p class="text-xl text-slate-300">Không thể xóa chính mình !</p>',
  //           confirmButtonText: 'Ok',
  //           confirmButtonColor: '#1a56db',
  //         })
  //       }
  //     }
  //   })
  // }
}
