import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../../../../models/user';
import {SportEvent} from '../../../../../models/sportevent';
import {UserService} from '../../../../../services/user.service';
import {Subscription} from 'rxjs/Subscription';
import {EventService} from '../../../../../services/event.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-user-list-item-detail',
    templateUrl: './user-list-item-detail.component.pug',
    styleUrls: ['./user-list-item-detail.component.sass']
})
export class UserListItemDetailComponent implements OnInit, OnDestroy {
    user: User;
    event: SportEvent;
    id: string;
    friendsWith: boolean;
    sportEvents: SportEvent[];
    private friendSub: Subscription;
    private friends: User[];


    constructor(private route: ActivatedRoute, private router: Router,
                private userService: UserService, private eventService: EventService) {
    }

    ngOnInit() {
        this.eventService.getEvents().then((events) => {
            console.log(events);
            this.sportEvents = events;
        })
            .catch(error => console.log(error));

        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.userService.getFriends();

            if (this.router.isActive('/users', false)) {
                this.user = this.userService.getUser(this.id);
            }

            if (this.router.isActive('/friends', false)) {
                this.user = this.userService.getFriend(this.id);
            }

            this.friendSub = this.userService.friendsChanged.subscribe((friends: User[]) => {
                if (!this.user) {
                    this.userService.getUsers(this.id).then((user: User) => {
                        this.user = user;
                        this.userService.getUserFriends(this.user._id).then((friends: User[]) => this.friends = friends);
                        this.friendsWith = friends.some(user => user._id === this.user._id);
                        if (this.router.isActive('/friends', false) && !this.friendsWith) {
                            this.router.navigate(['..'], {relativeTo: this.route});
                        }
                    });
                } else {
                    this.userService.getUserFriends(this.user._id).then((friends: User[]) => this.friends = friends);
                    this.friendsWith = friends.some(user => user._id === this.user._id);
                }
            });
        });
    }

    addFriend() {
        this.userService.addFriend(this.user._id);
        this.userService.getFriends();
    }

    removeFriend() {
        this.userService.removeFriend(this.user._id);
        this.userService.getFriends();
    }

    getEvents() {
        return this.sportEvents = _.filter(this.sportEvents, {attendees: [{_id: this.id}]});
    }

    ngOnDestroy() {
        this.friendSub.unsubscribe();
    }
}
