import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {SportEvent} from '../../../models/sportevent';
import {AuthService} from '../../../services/auth.service';
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sportevent-detail',
  templateUrl: 'sportevent-detail.component.pug',
  styleUrls: ['./sportevent-detail.component.sass']
})
export class SportEventDetailComponent implements OnInit {
  private id: string;
  private sportEvent;
  private city: string;
  private postalcode: string;
  private address: string;
  private suffix: string;
  private organisorName: string;
  private organisorId: string;
  attendees = 0;
  color = '';
  value = 0;
  loading = true;

  constructor(private router: Router, private route: ActivatedRoute,
              private eventService: EventService, private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          console.log('sportevent: ' + this.sportEvent);

          this.eventService.getEvent(this.id)
            .then(
              (event: SportEvent) => {
                console.log(event);
                this.loading = false;
                this.sportEvent = event;
                if (this.sportEvent.reservation !== undefined) {
                  this.city = this.sportEvent.reservation.hall.building.address.city;
                  this.postalcode = this.sportEvent.reservation.hall.building.address.zipCode;
                  this.suffix = this.sportEvent.reservation.hall.building.address.suffix;

                  if (this.sportEvent.reservation.hall.building.address.suffix == null) {
                    this.suffix = '';
                  } else {
                    this.suffix = ` ${this.sportEvent.reservation.hall.building.address.suffix}`;
                  }

                  this.address = `${this.sportEvent.reservation.hall.building.address.streetName} ` +
                      `${this.sportEvent.reservation.hall.building.address.houseNumber}` +
                      `${this.suffix}`;
                }

                this.organisorName = `${this.sportEvent.organisor.firstname} ${this.sportEvent.organisor.lastname}`;
                this.organisorId = this.sportEvent.organisor._id;
                this.value =  (this.sportEvent.attendees.length / this.sportEvent.maxAttendees) * 100;

              }
            );
        }
      );
  }

  getMode(): string {
    if (this.value === 100) {
      return 'full';
    } else if (this.value >= 75) {
      return 'almost';
    }
  }

  getWidth(): string {
    return `${this.value}%`;
  }

  getCurrentLoggedInUser(): string {
    return this.authService.getLoggedInUserId();
  }

  matchAttendeeId(): string {
    const attendee = _.find(this.sportEvent.attendees, ['_id', this.getCurrentLoggedInUser()]);
    return attendee === undefined ? '' : attendee._id;
  }

  removeEvent() {
    console.log('probeer evenement te verwijderen');
    this.eventService.removeEvent(this.id).then(
      (response) => {
        console.log('response: ' + JSON.stringify(response));
        this.snackBar.open('Evenement is succesvol verwijderd!', 'Sluiten', {duration: 3000});
        this.router.navigate(['../'], {relativeTo: this.route});

    })
    .catch((err) => {
      if (err.status === 401) {
        this.snackBar.open('U kunt dit evenement niet verwijderen!', 'Sluiten', { duration: 3000 });
      }
      console.log(err);
    });
  }

}
