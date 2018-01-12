import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from "../models/user";
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    updateUser(user: User): Promise<any> {
        return this.http.put(`${environment.api.url}/users`, user).toPromise();
    }

    getUser(): Promise<User> {
        return this.http.get<User>(`${environment.api.url}/users`).toPromise();
    }

    removeUser(): Promise<any> {
        return this.http.delete(`${environment.api.url}/users`).toPromise();
    };

    changePassword(passwords): Promise<any> {
        return this.http.put(`${environment.api.url}/changePassword`, passwords).toPromise()
            .then((res: {token: string}) => {
                sessionStorage.setItem('token', res.token);
                localStorage.removeItem('token');
            });
    }
}