import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from "../models/user";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

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
      });
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
