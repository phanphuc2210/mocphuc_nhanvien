import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() darkMode: any;
  @Input() userName: any;
  @Output() changeTheme = new EventEmitter();
  
  constructor(private router: Router) {}
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
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
