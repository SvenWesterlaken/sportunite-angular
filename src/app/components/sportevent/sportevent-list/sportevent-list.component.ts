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

    events : SportEvent[];
    resultEvents : SportEvent[];
    toggleOpen = false;

    constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private eventService: EventService) {}

    ngOnInit() {
        this.eventService.getEvents()
          .then((result : SportEvent[]) => {
            this.events = result;
            this.resultEvents = this.events;
            })
          .catch((error) =>  console.log("Geen sportevents gevonden")
          );

    }

    onCreateNewEvent() {
        this.router.navigate(['add'], {relativeTo: this.route});
    }

   searchEvents(searchInput: HTMLInputElement) {
        if (searchInput.value != "") {
            this.resultEvents = this.events.filter(x => x.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        }
        else {
            this.resultEvents = this.events;
        }
    }

    onToggle() {
        this.toggleOpen = !this.toggleOpen;
    }

    logout() {
        this.auth.logout();
    }
}
