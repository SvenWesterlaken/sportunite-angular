import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-sportevent-list-user',
  templateUrl: './sportevent-list-user.component.pug',
  styleUrls: ['./sportevent-list-user.component.sass']
})
export class SportEventListUserComponent implements OnInit {

  events = [];
  resultEvents = [];
  toggleOpen = false;
  user: User;
  selectedSports = [];
  selectedSecondDate;
  selectedFirstDate;
  @ViewChild('titleInput') titleInput: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute,  private eventService: EventService, private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().then((user) => { this.user = user; });

    this.eventService.getEvents()
      .then((result) => {
        this.events = _.filter(result, { organisor: { _id: this.user._id } });
        this.resultEvents = this.events;
      })
      .catch((error) =>  console.log('Geen sportevents gevonden')
      );
  }

  onCreateNewEvent() {
    this.router.navigate(['../add'], {relativeTo: this.route});
  }

  getFilterData(filter) {
    this.selectedSports = filter.sports;
    this.selectedSecondDate = filter.secondDate;
    this.selectedFirstDate = filter.firstDate;

    this.onFilter();
  }

  onFilter() {
    if (this.titleInput.nativeElement.value !== '') {
      this.resultEvents = _.filter(this.events , x => x.name.toLowerCase().includes(this.titleInput.nativeElement.value.toLowerCase()));
    }
    else {
      this.resultEvents = this.events;
    }

    if (this.selectedSports.length !== 0) {
      this.resultEvents = _.filter(this.resultEvents, events => _.includes(this.selectedSports, events.sport.name));
    }

    if (this.selectedFirstDate  || this.selectedSecondDate ) {
      this.resultEvents = _.filter(this.resultEvents, events => moment(events.eventStartTime).isBetween(this.selectedFirstDate, this.selectedSecondDate, 'days', '[]'));
    }
  }

  onToggle() {
    this.toggleOpen = !this.toggleOpen;
  }

}
