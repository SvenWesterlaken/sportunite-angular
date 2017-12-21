import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  getToken(name: string = 'token'): string {
    return localStorage.getItem(name) || sessionStorage.getItem(name);
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  register(user): Observable<any> {
    return this.http.post(`${environment.api.url}/register`, user);
  }

  login(email: string, password: string, keep: boolean) {
    return this.http.post(`${environment.api.url}/login`, { email: email, password: password}).subscribe(
      (res: {token: string}) => {
        keep ? localStorage.setItem('token', res.token) : sessionStorage.setItem('token', res.token);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
