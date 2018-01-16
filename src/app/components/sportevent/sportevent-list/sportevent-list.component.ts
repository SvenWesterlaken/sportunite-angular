import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {SportEvent} from "../../../models/sportevent";
import {EventService} from "../../../services/event.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-sportevent-list',
    templateUrl: './sportevent-list.component.pug',
    styleUrls: ['./sportevent-list.component.sass']
})
export class SportEventListComponent implements OnInit {

    events : SportEvent[];
    resultEvents = [];
    @ViewChild('titleInput') titleInput : ElementRef;
    toggleOpen = false;
    selectedSports = [];

    constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private eventService: EventService) {}

    ngOnInit() {
        this.eventService.getEvents()
          .then((result) => {
            this.events = result;
            this.resultEvents = this.events;
/*            this.filteredEvents = this.resultEvents;*/
            })
          .catch((error) =>  console.log(error)
          );

    }

    onCreateNewEvent() {
        this.router.navigate(['add'], {relativeTo: this.route});
    }


    onFilter(sports) {


      if (this.titleInput.nativeElement.value != "") {
        this.resultEvents = this.events.filter(x => x.name.toLowerCase().includes(this.titleInput.nativeElement.value.toLowerCase()));

      }
      else {
        this.resultEvents = this.events;
      }

      if (sports.length != 0) {
        this.resultEvents = _.filter(this.resultEvents, function (p) {return _.includes(sports, p.sport.name)});
      }

    }


    onToggle() {
        this.toggleOpen = !this.toggleOpen;
    }


}
