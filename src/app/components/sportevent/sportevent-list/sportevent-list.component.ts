import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {SportEvent} from "../../../models/sportevent";
import {Sport} from "../../../models/sport";

@Component({
    selector: 'app-sportevent-list',
    templateUrl: './sportevent-list.component.pug',
    styleUrls: ['./sportevent-list.component.sass']
})
export class SportEventListComponent {

    events: SportEvent[] = [
      new SportEvent("Voetballen in een zaal", 10, 20, "Lekker voetballuh", "10-12-2017", "10-12-2017", new Sport("Voetbal", 1), "10"),
        new SportEvent("Basketballen in een zaal", 10, 20, "Lekker basketballuh", "10-12-2017", "10-12-2017", new Sport("Voetbal", 1), "11"),
    ];

    sportevents;

    constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) {}

    onCreateNewEvent() {
        this.router.navigate(['add'], {relativeTo: this.route});
    }

    searchEvents(searchInput: HTMLInputElement) {
        /*this.service.getEventsyFilter(searchInput.value);*/
        //solution until api is available
        if (searchInput.value != "") {
            this.events = this.events.filter(x => x.name === searchInput.value)
        }
        console.log(searchInput.value);
    }

    logout() {
        this.auth.logout();
    }
}
