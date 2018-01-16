import { Component, OnInit, Input} from '@angular/core';
import {Sport} from "../../../../models/sport";
import {SportEvent} from "../../../../models/sportevent";
import {EventService} from "../../../../services/event.service";

@Component({
  selector: 'app-sportevent-list-item',
  templateUrl: './sportevent-list-item.component.pug',
  styleUrls: ['./sportevent-list-item.component.sass']
})
export class SportEventListItemComponent implements OnInit {

  @Input() event ;
  @Input() index: number;
  attendees = 0;
  color = '';
  value = 0;

  constructor() { }

  ngOnInit() {
    this.attendees = this.event.attendees.length;
    this.value =  (this.event.attendees.length / this.event.maxAttendees) * 100;
  }

  setColor() {
    if (this.value < 50) {
      return 'primary'
    }
    else if (this.value === 100) {
      return 'warn'
    }
    else
      return 'accent'
  }

}
