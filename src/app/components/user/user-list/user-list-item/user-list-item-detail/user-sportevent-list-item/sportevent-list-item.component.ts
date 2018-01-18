import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-user-sportevent-list-item',
  templateUrl: './sportevent-list-item.component.pug',
  styleUrls: ['./sportevent-list-item.component.sass']
})
export class UserSportEventListItemComponent implements OnInit {

  @Input() event;
  @Input() index: number;
  value = 0;

  constructor() { }

  ngOnInit() {
    this.value = (this.event.attendees.length / this.event.maxAttendees) * 100;
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
