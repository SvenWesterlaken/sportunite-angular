import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-friend-list-item',
    templateUrl: './user-list-item.component.pug',
    styleUrls: ['./user-list-item.component.sass']
})
export class FriendsListItemComponent implements OnInit {

    @Input() user;
    @Input() index: number;

    routerLink = '/users/';

    constructor(private router: Router) {
    }

    ngOnInit() {
        if (this.router.isActive('/profile', false)) {
            this.routerLink = '/friends/';
        }
    }

}