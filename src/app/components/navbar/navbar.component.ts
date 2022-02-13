import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  links: string[];
  isLoggedIn: boolean;
  constructor(private authService: AuthService) {
    this.links = ['home', 'signup', 'dashboard'];
  }

  ngOnInit(): void {
    this.authService.logChange.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  handleLogout(): void {
    this.authService.logout();
  }
}
