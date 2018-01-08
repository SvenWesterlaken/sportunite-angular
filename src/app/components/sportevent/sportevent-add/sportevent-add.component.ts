import {ViewChild, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Sport} from '../../../models/sport';
import * as moment from 'moment';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';
import {StepperComponent} from '../../stepper/stepper.component';
import {CustomValidators} from 'ng4-validators';
import {IsGreaterThan, MinimumTime, ValidateDateFormat} from '../../../other/custom.validator';
import {Hall} from '../../../models/hall';
import {Building} from '../../../models/building';
import {SportEvent} from '../../../models/sportevent';
import * as _ from 'lodash';

@Component({
	selector: 'app-sportevent-add',
	templateUrl: './sportevent-add.component.pug',
	styleUrls: ['./sportevent-add.component.sass']
})
export class SportEventAddComponent implements OnInit {
	private eventForm: FormGroup;
	private inputValue: number;
	private startTime;
	private endTime;
	private sports = [];
	halls: Hall[];
	resultHalls = [];
	resultBuildings = [];
	buildings: Building[];

	@ViewChild(StepperComponent) stepper: StepperComponent;

	tomorrow = moment().add(1, 'days');

	constructor(private eventService: EventService, private router: Router) {}

	ngOnInit() {
		this.eventService.getSports().then((sports: Sport[]) => this.sports = sports);
		this.eventService.getHalls().then((halls: Hall[]) => this.halls = halls );
		this.eventService.getBuildings().then((buildings: Building[]) => this.buildings = buildings);
		this.initForm();
	}

	getForm() {
		return this.eventForm;
	}

	private initForm() {
	  const startTime = new FormControl(null, Validators.required);
	  const minAttendees = new FormControl(2, [Validators.required, Validators.min(2), CustomValidators.digits]);

		this.eventForm = new FormGroup({
			name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
			sport: new FormControl(null, Validators.required),
			eventDate: new FormGroup({
				startTime: startTime,
				endTime: new FormControl(null, [Validators.required, MinimumTime(startTime)]),
				date: new FormControl(null, [Validators.required, ValidateDateFormat, CustomValidators.minDate(moment().format())]),
			}),
			location: new FormGroup({
				city: new FormControl(null, Validators.required),
				building: new FormControl(null, Validators.required),
				hall: new FormControl(null, Validators.required)
			}),
			eventAttendees: new FormGroup({
				minAttendees: minAttendees,
				maxAttendees: new FormControl(2, [Validators.required, Validators.min(2), IsGreaterThan, CustomValidators.digits]),
			}),
			description: new FormControl(null, [Validators.required, Validators.minLength(50), Validators.maxLength(500)])
		});
	}

	onSubmit() {
		const form = this.eventForm.value;

		const event = {
			name: form.name,
			sportId: form.sport.sportId,
			minAttendees: form.eventAttendees.minAttendees,
			maxAttendees: form.eventAttendees.maxAttendees,
			description: form.value.description,
			eventEndTime: moment(`${form.eventDate.date} ${form.eventDate.endTime}`).format(),
			eventStartTime: moment(`${form.eventDate.date} ${form.eventDate.startTime}`).format()
		};

		this.eventService.addEvent(event).then((resultEvent: SportEvent) =>
      this.eventService.addUserToEvent(resultEvent.sportEventId).then(result =>
				this.eventService.addReservation({
					hallId: form.hall.hallId,
					timeFinish: moment(`${form.eventDate.date} ${form.eventDate.endTime}`).format(),
					startTime: moment(`${form.eventDate.date} ${form.eventDate.startTime}`).format(),
					sportEventId: resultEvent.sportEventId,
					definite: false
				}).then(reservation => this.router.navigate(['/sportevent']))
			)
		);
	}

	getHalls(building, sport) {
		this.resultHalls = _.filter(this.halls, (item: Hall) =>
			_.includes(item.sports, { sportId: sport.sportId }) && item.buildingId === building.buildingId
		);

		if (this.resultHalls.length === 0) {
      this.eventForm.get('location.building').setErrors({'notFound': true});
    }
	}

	getBuildings(city) {

		this.resultBuildings = _.filter(this.buildings, { address: { city: city } });


		if (this.resultBuildings.length === 0) {
      this.eventForm.get('location.city').setErrors({'notFound': true});
		}



	}


}
