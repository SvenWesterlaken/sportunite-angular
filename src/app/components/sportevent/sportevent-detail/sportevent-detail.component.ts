import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../services/event.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {SportEvent} from "../../../models/sportevent";

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
  private organisor: string;
  attendees = 0;
  color = '';
  value = 0;

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          console.log("sportevent: " + this.sportEvent);

          this.eventService.getEvent(this.id)
            .then(
              (event: SportEvent) => {
                console.log(event);
                this.sportEvent = event;
                if (this.sportEvent.reservation != undefined) {
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

                this.organisor = `${this.sportEvent.organisor.firstname} ${this.sportEvent.organisor.lastname}`;
                this.value =  (this.sportEvent.attendees.length / this.sportEvent.maxAttendees) * 100;

              }
            )
        }
      )
  }

  onAttend() {
    this.router.navigate(['attend'], {relativeTo: this.route});
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

}
