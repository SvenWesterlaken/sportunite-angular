import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Sport} from "../../../../models/sport";
import {EventService} from "../../../../services/event.service";
import {ValidateDateFormat} from "../../../../other/custom.validator";
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sportevent-list-filter',
  templateUrl: './sportevent-list-filter.component.pug',
  styleUrls: ['./sportevent-list-filter.component.sass']
})
export class SportEventListFilterComponent implements OnInit {

  color: string;
  sports: Sport[];
  selectedSports = [];
  dateForm: FormGroup;

  @Output() handleSelectedSports = new EventEmitter();

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getSports().then((sports: Sport[]) => this.sports = sports);

    this.dateForm = new FormGroup({
      firstDate: new FormControl('', [Validators.required, ValidateDateFormat]),
      secondDate: new FormControl('', [Validators.required, ValidateDateFormat])
    });

    this.dateForm.valueChanges.subscribe(value => this.onSportsSelected());
  }

  onSportsSelected() {
    this.handleSelectedSports.emit({ sports: this.selectedSports, firstDate: this.dateForm.value.firstDate, secondDate: this.dateForm.value.secondDate });
  }
}
