import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('login', { static: false }) login: NgForm;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  formSubmit(): void {
    if (this.login.form.status === 'VALID') {
      this.authService
        .login(this.login.value.email, this.login.value.password)
        .subscribe(() => {
          this.router.navigate(['dashboard']);
          this.login.reset();
        });
    }
  }
}
