import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from "../models/user";
import {Subject} from "rxjs/Subject";
import * as _ from 'lodash';

@Injectable()
export class UserService {

    usersChanged = new Subject<User[]>();
    users: User[];
    friendsChanged = new Subject<User[]>();
    friends: User[];

    constructor(private http: HttpClient) {
    }

    updateUser(user: User): Promise<any> {
        return this.http.put(`${environment.api.url}/users`, user).toPromise();
    }

    getCurrentUser(): Promise<User> {
        return this.http.get<User>(`${environment.api.url}/profile`).toPromise();
    }


    removeUser(): Promise<any> {
        return this.http.delete(`${environment.api.url}/users`).toPromise();
    }

    changePassword(passwords): Promise<any> {
        return this.http.put(`${environment.api.url}/changePassword`, passwords).toPromise()
            .then((res: { token: string }) => {
                sessionStorage.setItem('token', res.token);
                localStorage.removeItem('token');
            });
    }

    getUsers(id?: string) {
        if (id) {
            return this.http.get(`${environment.api.url}/users/${id}`).toPromise();
        } else {
            this.http.get<User[]>(`${environment.api.url}/users`).toPromise()
                .then(((users: User[]) => {
                        this.users = users;
                        this.usersChanged.next(this.users.slice());
                    })
                );
        }
    }

    getUser(id: string) {
        if (this.users) {
            return _.filter(this.users, {_id: id})[0];
        } else {
            return null;
        }

    }

    getFriends() {
        this.http.get<User[]>(`${environment.api.url}/friends`).toPromise()
            .then(((friends: User[]) => {
                    this.friends = friends;
                    this.friendsChanged.next(this.friends.slice());
                })
            );
    }

    getFriend(id: string) {
        if (this.friends) {
            return _.filter(this.friends, {_id: id})[0];
        } else {
            return null;
        }
    }

    addFriend(userId: string): Promise<any> {
        return this.http.post(`${environment.api.url}/friends/${userId}`, null).toPromise();
    }

    removeFriend(userId: string): Promise<any> {
        return this.http.delete(`${environment.api.url}/friends/${userId}`).toPromise();
    }

}