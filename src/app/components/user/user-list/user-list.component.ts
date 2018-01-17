import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.pug',
    styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit, OnDestroy {
    private users: User[];
    private userSub: Subscription;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        //Get all users
        if (this.router.isActive('/users', false)) {
            this.userSub = this.userService.usersChanged.subscribe((users: User[]) => {
                this.users = users;
            });
            this.userService.getUsers();
        }

        //Get all friends
        if (this.router.isActive('/friends', false)) {
            this.userSub = this.userService.friendsChanged.subscribe((friends: User[]) => {
                this.users = friends;
            });
            this.userService.getFriends();
        }
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
