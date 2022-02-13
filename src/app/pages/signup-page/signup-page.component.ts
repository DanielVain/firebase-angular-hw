import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  @ViewChild('signup', { static: false }) signup: NgForm;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  formSubmit(): void {
    if (this.signup.form.status === 'VALID') {
      this.authService
        .signup(this.signup.value.email, this.signup.value.password)
        .subscribe(() => {
          this.router.navigate(['login']);
        });
    }
  }
}
