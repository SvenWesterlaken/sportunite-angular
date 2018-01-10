import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-sportevent-list',
    templateUrl: './sportevent-list.component.pug',
    styleUrls: ['./sportevent-list.component.sass']
})
export class SportEventListComponent {

    constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) {}

    onCreateNewEvent() {
        this.router.navigate(['add'], {relativeTo: this.route});
    }

    logout() {
        this.auth.logout();
    }
}
