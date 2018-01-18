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
	private id: number;
	private sportEvent: SportEvent;
	
	constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {}
	
	ngOnInit() {
		this.route.params.subscribe((params: Params) =>
			this.eventService.getEvent(params['id']).subscribe((event: SportEvent) => { this.sportEvent = event;	})
		);
	}
	
	public cancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}
	
	public proceed() {
		this.eventService.addUserToAttendEvent(this.id).subscribe(result => {
			this.router.navigate(['../'], {relativeTo: this.route});
		}, error => console.log(error));
	}
}