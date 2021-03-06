import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  tokenData: any;
  logChange: Subject<boolean>;
  constructor(private http: HttpClient) {
    this.logChange = new Subject<boolean>();
  }
  isAuth(): boolean {
    return this.isLoggedIn;
  }
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        tap((data: any) => {
          this.tokenData = data;
          this.isLoggedIn = true;
          this.logChange.next(true);
        })
      );
  }
  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      { email: email, password: password, returnSecureToken: true }
    );
  }
  logout(): void {
    this.isLoggedIn = false;
    this.tokenData = undefined;
    this.logChange.next(false);
  }
}
