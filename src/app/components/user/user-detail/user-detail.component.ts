import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.pug',
    styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
    private user: User;

    private friends: User[];
    private friendSub: Subscription;

    constructor(private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.userService.getCurrentUser().then((user) => {
            this.user = user;
        });

        this.userService.getFriends();

        this.friendSub = this.userService.friendsChanged.subscribe((friends: User[]) => {
            this.friends = friends;
        });
    }

    deleteUser() {
        this.userService.removeUser().then(() => {
            this.authService.logout();
            this.snackBar.open('Account succesvol verwijderd', 'Sluiten', {duration: 2000});
        }).catch((err) => {
            if (err.status == 409) {
                this.snackBar.open('Meld je eerst af voor aankomende events', 'Sluiten', {duration: 4000});
            }
        });
    }
}
