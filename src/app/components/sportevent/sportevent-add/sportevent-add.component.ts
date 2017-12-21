import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sport} from "../../../models/Sport";
import {SportEvent} from "../../../models/SportEvent";

@Component({
	selector: 'app-sportevent-add',
	templateUrl: './sportevent-add.component.pug',
	styleUrls: ['./sportevent-add.component.sass']
})
export class SporteventAddComponent implements OnInit {
	private eventForm: FormGroup;
	private inputValue: number;
	
	// public getInputValue() {
	// 	return this.inputValue;
	// }
	
	//hardcoded sports
	private sports = [new Sport("Basketbal"), new Sport("Hockey"), new Sport("Tennis")];
	
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
		let minAttendees;
		let maxAttendees;
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
		console.log("Added")
		
		const event: SportEvent = this.eventForm.value;
		
		console.log(event);
		
		/*this.dataStorageService.postEvent(event);
		 this.router.navigate(['/sportevent']);*/
	}
	
	revalidate() {
		this.eventForm.controls['maxAttendees'].updateValueAndValidity();
	}
	
	/*private validateMaxAttendees(formGroup: FormGroup) {
	 let maxAttendees = formGroup.controls.maxAttendees
	 let minAttendees = formGroup.controls.confirm;
	 
	 
	 return {
	 maxAttendees: {
	 valid: false
	 }
	 };*/
}
