import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {SportEvent} from "../../../models/SportEvent";

@Component({
	selector: 'app-sportevent-attend',
	templateUrl: './sportevent-attend.component.pug',
	styleUrls: ['./sportevent-attend.component.sass']
})
export class SportEventAttendComponent implements OnInit {
	private id: string;
	private sportEvent: SportEvent;
	
	constructor(private route: ActivatedRoute,
	            private router: Router,
	            private eventService: EventService) {
	}
	
	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					
					this.eventService.getEvent(this.id)
						.subscribe(
							(event: SportEvent) => {
								console.log(event);
								this.sportEvent = event;
								//this.sportEvent.sportEventId = event.sportEventId;
							}
						)
				}
			)
	}
	
	public getId(): string {
		return this.id;
	}
	
	public cancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}
	
	public proceed() {
		this.eventService.addUserToAttendEvent(this.sportEvent.sportEventId, sessionStorage.getItem('email') || localStorage.getItem('email'))
			.subscribe(result => {
				this.router.navigate(['../'], {relativeTo: this.route})
			});
	}
}