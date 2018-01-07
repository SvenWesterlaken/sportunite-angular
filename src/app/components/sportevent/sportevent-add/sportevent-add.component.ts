import {ViewChild, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sport} from "../../../models/Sport";
import * as moment from 'moment';
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";
import {StepperComponent} from "../../stepper/stepper.component";
import {CustomValidators} from 'ng4-validators';
import {ValidateDateFormat} from "../../../other/date.validator";
import {Hall} from "../../../models/Hall";
import {Building} from "../../../models/Building";

@Component({
	selector: 'app-sportevent-add',
	templateUrl: './sportevent-add.component.pug',
	styleUrls: ['./sportevent-add.component.sass']
})
export class SporteventAddComponent implements OnInit {
	private eventForm: FormGroup;
	private inputValue: number;
	private startTime;
	private endTime;
	private sports = [];
	streetName: string;
	houseNumber: string;
	halls: Hall[];
	resultHalls = [];
	resultBuildings = [];
	buildings: Building[];
	
	@ViewChild(StepperComponent) stepper: StepperComponent;
	
	tomorrow = moment().add(1, 'days');
	
	constructor(private eventService: EventService, private router: Router) {
	}
	
	ngOnInit() {
		console.log(this.eventService.getSports());
		this.eventService.getSports()
			.map(result => {
				return result as Sport
			})
			.subscribe(sports => this.sports = sports._embedded.sports);
		
		this.eventService.getHalls()
			.map(result => {
				return result as Hall
			})
			.subscribe(halls => this.halls = halls._embedded.halls as Hall[]);
		
		this.eventService.getBuildings()
			.map(result => {
				return result as Building
			})
			.subscribe(buildings => this.buildings = buildings._embedded.buildings as Building[]);
		
		
		this.initForm();
		
	}
	
	getForm() {
		return this.eventForm;
	}
	
	private initForm() {
		let sportEventName = '';
		let sportId = '';
		let startTime = '';
		let endTime = '';
		let date = '';
		let hall = '';
		let building = '';
		let city = '';
		let minAttendees = '';
		let maxAttendees = '';
		let description = '';
		
		this.eventForm = new FormGroup({
			'name': new FormControl(sportEventName, Validators.compose([Validators.required, Validators.minLength(3)])),
			'sport': new FormControl(sportId, Validators.required),
			'event-date': new FormGroup({
				'startTime': new FormControl(startTime, Validators.required),
				'endTime': new FormControl(endTime, Validators.required),
				'date': new FormControl(date, [Validators.required, ValidateDateFormat, CustomValidators.minDate(moment().format())]),
			}),
			'location': new FormGroup({
				'city': new FormControl(city, Validators.required),
				'building': new FormControl(building, Validators.required),
				'hall': new FormControl(hall, Validators.required)
			}),
			'event-attendees': new FormGroup({
				'minAttendees': new FormControl(minAttendees, Validators.compose([Validators.required, Validators.min(2)])),
				'maxAttendees': new FormControl(maxAttendees, Validators.compose([Validators.required, Validators.min(2)])),
			}),
			'description': new FormControl(description, Validators.compose([Validators.required, Validators.minLength(50), Validators.maxLength(500)])),
		});
	}
	
	onSubmit() {
		
		const event = {
			'name': this.eventForm.value.name,
			'sportId': this.eventForm.value.sport.sportId,
			'minAttendees': this.eventForm.controls['event-attendees'].value.minAttendees,
			'maxAttendees': this.eventForm.controls['event-attendees'].value.maxAttendees,
			'description': this.eventForm.value.description,
			//temporary solution
			'eventEndTime': this.eventForm.controls['event-date'].value.date.format("YYYY-MM-DD") + "T" +
			this.eventForm.controls['event-date'].value.endTime,
			'eventStartTime': this.eventForm.controls['event-date'].value.date.format("YYYY-MM-DD") + "T" +
			this.eventForm.controls['event-date'].value.startTime
		};
		
		console.log(event);
		
		
		this.eventService.addEvent(event)
			.subscribe(resultEvent => {
				console.log(resultEvent.sportEventId);
				this.eventService.addUserToEvent(resultEvent.sportEventId, sessionStorage.getItem('email') || localStorage.getItem('email'))
					.subscribe(result => {
						console.log(result);
						this.eventService.addReservation(
							{
								'hallId': this.eventForm.controls['location'].value.hall.hallId,
								'timeFinish': this.eventForm.controls['event-date'].value.date.format("YYYY-MM-DD") + "T" +
								this.eventForm.controls['event-date'].value.endTime,
								'startTime': this.eventForm.controls['event-date'].value.date.format("YYYY-MM-DD") + "T" +
								this.eventForm.controls['event-date'].value.startTime,
								'sportEventId': resultEvent.sportEventId,
								'definite': false
							})
							.subscribe(result => {
								console.log(result);
							})
					});
			});
		
		this.router.navigate(['/sportevent']);
		
	}
	
	revalidateDate() {
		this.eventForm.controls['event-date'].get('endTime').updateValueAndValidity();
	}
	
	revalidateAttendees() {
		this.eventForm.controls['event-attendees'].get('maxAttendees').updateValueAndValidity();
	}
	
	getHalls(building, sport) {
		
		let resultHalls = [];
		
		this.halls.forEach(function (item, index) {
			
			if (item.sports.findIndex(x => x.name === sport.name) != -1 && item.buildingId === building.buildingId) {
				resultHalls.push(item);
			}
		});
		
		this.streetName = this.eventForm.get('location.building').value.address.streetName;
		this.houseNumber = this.eventForm.get('location.building').value.address.houseNumber;
		
		this.resultHalls = resultHalls;
		
		if (this.resultHalls.length === 0)
			this.eventForm.get('location.building').setErrors({
				'notFound': true
			});
	}
	
	getBuildings(city) {
		
		this.resultBuildings = this.buildings.filter(function (b) {
			return (b.address.city === city);
		});
		
		
		if (this.resultBuildings.length === 0)
			this.eventForm.get('location.city').setErrors({
				'notFound': true
			});
		
		
	}
	
	
}
