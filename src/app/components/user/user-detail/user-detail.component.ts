import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../../services/auth.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {UserDetailDialogComponent} from "./user-detail-dialog/user-detail-dialog.component";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {EventService} from '../../../services/event.service';
import {SportEvent} from '../../../models/sportevent';


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
    private sportEvents: SportEvent[];

    constructor(private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router, private eventService: EventService) {
    }

    ngOnInit() {
      this.eventService.getEvents().then((events) => {
        console.log(events);
        this.sportEvents = events;
      }).catch(error => console.log(error));

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
                this.router.navigate(['/sportevent/organised']);
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

  getEvents() {
    return this.sportEvents = _.filter(this.sportEvents, {attendees: [{_id: this.user._id.toString()}]});
  }
}
