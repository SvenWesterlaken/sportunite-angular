import {ViewChild, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Sport} from '../../../models/sport';
import * as moment from 'moment';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';
import {StepperComponent} from '../../stepper/stepper.component';
import {CustomValidators} from 'ng4-validators';
import {IsGreaterThan, MinimumTime, ValidateDateFormat, ValidateMomentFormat} from '../../../other/custom.validator';
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
    @ViewChild(StepperComponent) stepper: StepperComponent;

    private eventForm: FormGroup;
    private sports = [];
    private halls: Hall[];
    private resultHalls = [];
    private resultBuildings = [];
    private buildings: Building[];

    tomorrow = moment().add(1, 'days');

    constructor(private eventService: EventService, private router: Router) {}

    ngOnInit() {
        const startTime = new FormControl('', [Validators.required, ValidateMomentFormat('HH:mm')]);
        const minAttendees = new FormControl(2, [Validators.required, Validators.min(2), CustomValidators.digits]);

        this.eventForm = new FormGroup({
          name: new FormControl('', [Validators.required, Validators.minLength(3)]),
          sport: new FormControl('', Validators.required),
          eventDate: new FormGroup({
            startTime: startTime,
            endTime: new FormControl('', [Validators.required, MinimumTime(startTime), ValidateMomentFormat('HH:mm')]),
            date: new FormControl('', [Validators.required, ValidateDateFormat, CustomValidators.minDate(moment().format())]),
          }),
          location: new FormGroup({
            city: new FormControl('', Validators.required),
            building: new FormControl('', Validators.required),
            hall: new FormControl('', Validators.required)
          }),
          eventAttendees: new FormGroup({
              minAttendees: minAttendees,
              maxAttendees: new FormControl(2, [Validators.required, Validators.min(2),
                                            IsGreaterThan(minAttendees), CustomValidators.digits]),
          }),
          description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)])
        });

        this.eventService.getSports().then((sports: Sport[]) => this.sports = sports);
        this.eventService.getHalls().then((halls: Hall[]) => this.halls = halls );
        this.eventService.getBuildings().then((buildings: Building[]) => this.buildings = buildings);
    }

    onSubmit() {
        const form = this.eventForm.value;

        const event = {
					name: form.name,
					sportId: form.sport.sportId,
					minAttendees: form.eventAttendees.minAttendees,
					maxAttendees: form.eventAttendees.maxAttendees,
					description: form.description,
					eventEndTime: moment(`${form.eventDate.date.format('YYYY-MM-DD')} ${form.eventDate.endTime}`).format(),
					eventStartTime: moment(`${form.eventDate.date.format('YYYY-MM-DD')} ${form.eventDate.startTime}`).format()
				};

			this.eventService.addEvent(event).then((resultEvent: SportEvent) =>
				this.eventService.addUserToEvent(resultEvent.sportEventId).then(result =>
					this.eventService.addReservation({
						hallId: form.location.hall.hallId,
						timeFinish: moment(`${form.eventDate.date.format('YYYY-MM-DD')} ${form.eventDate.endTime}`).format(),
						startTime: moment(`${form.eventDate.date.format('YYYY-MM-DD')} ${form.eventDate.startTime}`).format(),
						sportEventId: resultEvent.sportEventId,
						definite: false
					}).then(reservation => this.router.navigate(['/sportevent']))
				)
			);
		}

	getHalls(building, sport) {

		this.resultHalls = _.filter(this.halls, (item: Hall) =>
        _.find(item.sports, (x: Sport) => x.sportId === sport.sportId) && item.buildingId === building.buildingId
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
