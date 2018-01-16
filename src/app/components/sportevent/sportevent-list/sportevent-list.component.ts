import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SportEvent} from "../../../models/sportevent";
import {EventService} from "../../../services/event.service";
import * as _ from 'lodash';
import * as moment from 'moment';


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
    selectedSecondDate;
    selectedFirstDate;

    constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) {}

    ngOnInit() {
        this.eventService.getEvents()
          .then((result) => {
            this.events = result;
            this.resultEvents = this.events;
            })
          .catch((error) =>  console.log(error)
          );

    }

    onCreateNewEvent() {
        this.router.navigate(['add'], {relativeTo: this.route});
    }

    getFilterData(filter) {
      this.selectedSports = filter.sports;
      this.selectedSecondDate = filter.secondDate;
      this.selectedFirstDate = filter.firstDate;

      this.onFilter();
    }

    onFilter() {

      let sports = this.selectedSports;
      let firstDate = this.selectedFirstDate;
      let secondDate = this.selectedSecondDate;

      if (this.titleInput.nativeElement.value != "") {
        this.resultEvents = _.filter(this.events , x => x.name.toLowerCase().includes(this.titleInput.nativeElement.value.toLowerCase()));
      }
      else {
        this.resultEvents = this.events;
      }

      if (this.selectedSports.length != 0) {
        this.resultEvents = _.filter(this.resultEvents, events => { return _.includes(sports, events.sport.name);});
      }

      if (this.selectedFirstDate  || this.selectedSecondDate ) {
        this.resultEvents = _.filter(this.resultEvents, events => { return moment(events.eventStartTime).isBetween(firstDate, secondDate, 'days', "[]");});
      }

    }

    onToggle() {
        this.toggleOpen = !this.toggleOpen;
    }


}
