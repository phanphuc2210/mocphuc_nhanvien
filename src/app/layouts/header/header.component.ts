import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() darkMode: any;
  @Input() userName: any;
  @Input() avatar: any;
  @Output() changeTheme = new EventEmitter();
  
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
  }

  public toggleDarkMode() {
    if(this.darkMode === 'light') {
      localStorage.setItem('theme', 'dark')
      this.darkMode = 'dark'
    }
    else {
      localStorage.setItem('theme', 'light')
      this.darkMode = 'light'
    }
    this.changeTheme.emit(this.darkMode);
  }

  public logOut() {
    this.authService.logOut()
  }
}
