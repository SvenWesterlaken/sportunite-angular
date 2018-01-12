import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {SportEvent} from "../../../models/sportevent";
import {Sport} from "../../../models/sport";
import {EventService} from "../../../services/event.service";

@Component({
    selector: 'app-sportevent-list',
    templateUrl: './sportevent-list.component.pug',
    styleUrls: ['./sportevent-list.component.sass']
})
export class SportEventListComponent implements OnInit {

    events: SportEvent[];
    resultEvents: SportEvent[];

    constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private eventService: EventService) {}

    ngOnInit() {
        this.events = this.eventService.getEvents();
        this.resultEvents = this.events;
}

    onCreateNewEvent() {
        this.router.navigate(['add'], {relativeTo: this.route});
    }

    searchEvents(searchInput: HTMLInputElement) {
        /*this.service.getEventsyFilter(searchInput.value);*/
        //solution until api is available
        if (searchInput.value != "") {
            this.resultEvents = this.events.filter(x => x.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        }
        else {
            this.resultEvents = this.events;
        }
        console.log(searchInput.value);
    }

    logout() {
        this.auth.logout();
    }
}
