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

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          this.eventService.getEvent(this.id)
            .subscribe(
              (event: SportEvent) => {
                console.log(event);
                this.sportEvent = event;
                //this.sportEvent.sportEventId = event.sportEventId;
              }
            )
        }
      )

  }

}
