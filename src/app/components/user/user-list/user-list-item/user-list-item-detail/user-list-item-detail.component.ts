import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../../../../models/user";
import {UserService} from "../../../../../services/user.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-user-list-item-detail',
    templateUrl: './user-list-item-detail.component.pug',
    styleUrls: ['./user-list-item-detail.component.sass']
})
export class UserListItemDetailComponent implements OnInit, OnDestroy {
    user: User;
    id: number;
    friendsWith: boolean;

    private friendSub: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.userService.getFriends();

            if (this.router.isActive('/profile/friends', false)) {
                this.user = this.userService.getFriend(this.id);
            }

            if (this.router.isActive('/users', false)) {
                this.user = this.userService.getUser(this.id);
            }

            if (this.router.isActive('/friends', false)) {
                this.user = this.userService.getFriend(this.id);
            }

            this.friendSub = this.userService.friendsChanged.subscribe((friends: User[]) => {
                if (!this.user) {
                    this.router.navigate(['..'], {relativeTo: this.route});
                } else {
                    this.friendsWith = friends.some(user => user._id === this.user._id);
                }
            });
        });
    };

    addFriend() {
        this.userService.addFriend(this.user._id);
        this.userService.getFriends();
    }

    removeFriend() {
        this.userService.removeFriend(this.user._id);
        this.userService.getFriends();
    }

    ngOnDestroy() {
        this.friendSub.unsubscribe();
    }
}
