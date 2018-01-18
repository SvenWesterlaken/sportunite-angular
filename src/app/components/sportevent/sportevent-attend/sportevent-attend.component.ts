import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {SportEvent} from "../../../models/SportEvent";
import {MatSnackBar} from "@angular/material";

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
	            private eventService: EventService,
              private snackBar: MatSnackBar) {
	}

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];

					this.eventService.getEvent(this.id)
						.then(
							(event: SportEvent) => {
								console.log(event);
								this.sportEvent = event;
							}
						)
				}
			)
	}

	public getId(): string {
		return this.id;
	}

	public getEvent() : SportEvent {
		return this.sportEvent;
	}

	public cancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	public proceed() {
		this.eventService.addUserToAttendEvent(this.sportEvent.sportEventId, sessionStorage.getItem('email') || localStorage.getItem('email'))
			.subscribe(result => {
        this.snackBar.open('U hebt zich succesvol aangemeld voor dit evenement!', 'Sluiten', { duration: 3000 });
				this.router.navigate(['../'], {relativeTo: this.route})
			});
	}
}
