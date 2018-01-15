import { Component, OnInit } from '@angular/core';
import {SportEvent} from "../../../models/sportevent";
import {EventService} from "../../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import * as _ from 'lodash';

@Component({
  selector: 'app-sportevent-list-user',
  templateUrl: './sportevent-list-user.component.pug',
  styleUrls: ['./sportevent-list-user.component.sass']
})
export class SportEventListUserComponent implements OnInit {

  events : SportEvent[];
  resultEvents : SportEvent[];
  toggleOpen = false;
  user : User;

  constructor(private router: Router, private route: ActivatedRoute,  private eventService: EventService, private userService: UserService) {}

  ngOnInit() {

    this.userService.getCurrentUser().then((user) => { this.user = user; });

    this.eventService.getEvents()
      .then((result) => {
        this.events = _.filter(result, { organisor: { _id: this.user._id } });
        this.resultEvents = this.events;
      })
      .catch((error) =>  console.log("Geen sportevents gevonden")
      );
  }

  onCreateNewEvent() {
    this.router.navigate(['../add'], {relativeTo: this.route})

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

}
