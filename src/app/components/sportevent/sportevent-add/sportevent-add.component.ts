import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sport} from "../../../models/Sport";
import {SportEvent} from "../../../models/SportEvent";
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";

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

	constructor(private eventService: EventService, private router: Router) {
	}

	ngOnInit() {
		console.log(this.eventService.getSports());
		this.eventService.getSports()
			.map(result => { return result.json() as Sport})
			.subscribe(sports => this.sports = sports._embedded.sports);
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
		let location = '';
		let minAttendees = '';
		let maxAttendees = '';
		let description = '';
		
		this.eventForm = new FormGroup({
			'name': new FormControl(sportEventName, Validators.compose([Validators.required, Validators.minLength(3)])),
			'sport': new FormControl(sportId, Validators.required),
			'startTime': new FormControl(startTime, Validators.required),
			'endTime': new FormControl(endTime, Validators.required),
			'date': new FormControl(date, Validators.required),
			'location': new FormControl(location, Validators.required),
			'minAttendees': new FormControl(minAttendees, Validators.compose([Validators.required, Validators.min(2)])),
			'maxAttendees': new FormControl(maxAttendees, Validators.compose([Validators.required, Validators.min(2)])),
			'description': new FormControl(description)
		});
	}
	
	onSubmit() {
		const event: SportEvent = this.eventForm.value;
		
		console.log(event);
		
		this.eventService.addEvent(event)
			.map(result => { return result.json() })
			.subscribe( result => console.log(result));

		this.router.navigate(['/sportevent']);
	}
	
	revalidate() {
		this.eventForm.controls['maxAttendees'].updateValueAndValidity();
		this.eventForm.controls['endTime'].updateValueAndValidity();
	}

}
