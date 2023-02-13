import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { confirmPasswordValidator } from 'src/app/helper/validateConfirmPassword';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isShowPass:boolean = false
  typePass: string = 'password'
  signupForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.compose([
      Validators.required, Validators.pattern(/^[0-9]{10}$/i)
    ])],
    address: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    confirmPassword: ['', Validators.compose([Validators.required])]
  }, { validator: confirmPasswordValidator })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  public signUp() {
    const data: User = {
      firstname: this.signupForm.controls['firstname'].value!,
      lastname: this.signupForm.controls['lastname'].value!,
      phone: this.signupForm.controls['phone'].value!,
      address: this.signupForm.controls['address'].value!,
      email: this.signupForm.controls['email'].value!,
      password: this.signupForm.controls['password'].value!,
      role: 'Admin'
    }

    this.authService.register(data).subscribe({
      next: res => {
        console.log(res);
        
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Đăng ký thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
          }
        })
      },
      error: err => {
        alert('Something went wrong!')
      }
    })
  }

  public showHidePass() {
    this.isShowPass = !this.isShowPass
    this.typePass = this.isShowPass === true? 'text' : 'password'
  }
}
