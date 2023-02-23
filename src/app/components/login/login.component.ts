import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isShowPass:boolean = false
  typePass: string = 'password'
  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  public login() {
    const data = {
      email: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!,
    }

    this.authService.login(data).subscribe({
      next: res => {
          if(res.data.role === "Admin") {
            this.authService.loginSubject.next(true)
            this.authService.userSubject.next(res.data)

            // Add info into localStorage
            localStorage.setItem('token', res.token)            
            localStorage.setItem('user', JSON.stringify(res.data)) 

            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#0e9f6e',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.router.navigate(['/'])
              }
            })
          } else {
            Swal.fire({
              background: '#000',
              icon: 'error',
              title: '<p class="text-xl text-slate-300">Tài khoản này không có quyền truy cập!!!</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#0e9f6e',
            })
          }
      },
      error: err => {
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })
      }
    })
  }

  public showHidePass() {
    this.isShowPass = !this.isShowPass
    this.typePass = this.isShowPass === true? 'text' : 'password'
    
  }
}
