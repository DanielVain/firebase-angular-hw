import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  links: string[];
  isLoggedIn: boolean;
  loggedInChangeSub: Subscription;
  constructor(private authService: AuthService, private router: Router) {
    this.links = ['home', 'dashboard'];
  }
  ngOnDestroy(): void {
    this.loggedInChangeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.loggedInChangeSub = this.authService.logChange.subscribe(
      (status: boolean) => {
        this.isLoggedIn = status;
      }
    );
  }
  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
