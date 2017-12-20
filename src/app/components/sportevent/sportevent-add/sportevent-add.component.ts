import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
	selector: 'app-sportevent-add',
	templateUrl: './sportevent-add.component.pug',
	styleUrls: ['./sportevent-add.component.sass']
})
export class SporteventAddComponent implements OnInit {
	private eventForm: FormGroup;
	
	constructor() {
	}
	
	ngOnInit() {
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
			'name': new FormControl(sportEventName),
			'sport': new FormControl(sportId),
			'startTime': new FormControl(startTime),
			'endTime': new FormControl(endTime),
			'date': new FormControl(date),
			'location': new FormControl(location),
			'minAttendees': new FormControl(minAttendees),
			'maxAttendees': new FormControl(maxAttendees),
			'description': new FormControl(description)
		});
	}
	
	onSubmit() {
	}
}
