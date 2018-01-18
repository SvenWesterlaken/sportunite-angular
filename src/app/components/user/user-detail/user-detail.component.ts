import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../../services/auth.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {UserDetailDialogComponent} from "./user-detail-dialog/user-detail-dialog.component";
import {Router} from "@angular/router";


@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.pug',
    styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
    private user: User;

    private friends: User[];
    private friendSub: Subscription;

    private dialogSub: Subscription;

    constructor(private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
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
                this.openDialog();
            }
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(UserDetailDialogComponent, {width: `${this.getDialogWidth()}vw`});

        this.dialogSub = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigate(['/']); //Wordt eigen sporteventen endpoint wanneer deze beschikbaar is
            }
        });
    }

    private getDialogWidth(): number {
        const screenwidth = window.screen.width;

        if (screenwidth <= 600) {
            return 90;
        } else if (screenwidth <= 992) {
            return 80;
        } else if (screenwidth <= 1200) {
            return 50;
        } else {
            return 30;
        }
    }
}
