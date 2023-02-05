import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  darkMode: any = localStorage.getItem('theme')? localStorage.getItem('theme') : 'light';
  user!: any

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    localStorage.setItem('theme', 'light')
    this.authService.userSubject.subscribe(res => {
      this.user = res
    })
  }

  public changeTheme(theme: any): void {
    // console.log('changeTheme:', data);
    this.darkMode = theme
  }
}
