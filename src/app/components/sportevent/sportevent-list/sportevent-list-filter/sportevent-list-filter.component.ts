import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Sport} from "../../../../models/sport";
import {EventService} from "../../../../services/event.service";

@Component({
  selector: 'app-sportevent-list-filter',
  templateUrl: './sportevent-list-filter.component.pug',
  styleUrls: ['./sportevent-list-filter.component.sass']
})
export class SportEventListFilterComponent implements OnInit {

  color: string;
  sports : Sport[];
  selectedSports = [];
  @Output() handleSelectedSports = new EventEmitter();

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getSports().then((sports: Sport[]) => this.sports = sports);
  }

  onSportsSelected() {
    this.handleSelectedSports.emit(this.selectedSports);
  }

}
