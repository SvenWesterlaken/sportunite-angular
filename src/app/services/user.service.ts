import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from "../models/user";
import {Subject} from "rxjs/Subject";

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

    // getUsers(): Promise<any> {
    //     return this.http.get(`${environment.api.url}/users`).toPromise();
    // }

    getUsers() {
        this.http.get<User[]>(`${environment.api.url}/users`).toPromise()
            .then(((users: User[]) => {
                    this.users = users;
                    console.log(this.users);
                    this.usersChanged.next(this.users.slice());
                })
            );
    }

    getUser(id: number) {
        if (this.users) {
            return this.users[id];
        } else {
            return null;
        }
    }

    getFriends() {
        this.http.get<User[]>(`${environment.api.url}/friends`).toPromise()
            .then(((friends: User[]) => {
                    this.friends = friends;
                    console.log(this.friends);
                    this.friendsChanged.next(this.friends.slice());
                })
            );
    }

    getFriend(id: number) {
        if (this.friends) {
            return this.friends[id];
        } else {
            return null;
        }
    }

    // checkFriend(userId: string) : boolean {
    //     return this.friends.some(user => user._id === userId);
    // }

    addFriend(userId: string): Promise<any> {
        return this.http.post(`${environment.api.url}/friends/${userId}`, null).toPromise();
    }

    removeFriend(userId: string): Promise<any> {
        return this.http.delete(`${environment.api.url}/friends/${userId}`).toPromise();
    }
}