import { Component, OnInit, Input} from '@angular/core';
import {Sport} from "../../../../models/sport";
import {SportEvent} from "../../../../models/sportevent";

@Component({
  selector: 'app-sportevent-list-item',
  templateUrl: './sportevent-list-item.component.pug',
  styleUrls: ['./sportevent-list-item.component.sass']
})
export class SportEventListItemComponent implements OnInit {

  @Input() event: SportEvent;
  @Input() index: number;
  color = '';
  value = 40;

  constructor() { }

  ngOnInit() {
  }

  setColor() {
    if (this.value < 30) {
      return 'primary'
    }
    else if (this.value === 100) {
      return 'primary'
    }
    else
      return 'accent'
  }

}
