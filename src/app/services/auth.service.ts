import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from "../models/user";
import {JwtHelper} from "angular2-jwt-session";

@Injectable()
export class AuthService {
  private jwt;

  constructor(private http: HttpClient, private router: Router) {
    this.jwt = new JwtHelper();
  }

  getToken(name: string = 'token'): string {
    return localStorage.getItem(name) || sessionStorage.getItem(name);
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.api.url}/register`, user);
  }

  login(login: { email: string, password: string, keep: boolean }): Promise<void> {
    return this.http.post(`${environment.api.url}/login`, { email: login.email, password: login.password}).toPromise()
      .then((res: {token: string}) => {
        login.keep ? localStorage.setItem('token', res.token) : sessionStorage.setItem('token', res.token);
        login.keep ? localStorage.setItem('email', login.email) : sessionStorage.setItem('email', login.email);
      });
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getLoggedInUserId(): string {
    return this.jwt.decodeToken(this.getToken()).sub;
  }

}
