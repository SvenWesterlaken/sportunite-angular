import {Component, OnInit} from '@angular/core';
import {SportEvent} from '../../../models/sportevent';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-sportevent-leave',
  templateUrl: './sportevent-leave.component.pug',
  styleUrls: ['./sportevent-leave.component.sass']
})
export class SportEventLeaveComponent implements OnInit {
  private sportEvent: SportEvent;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
				this.eventService.getEvent(params['id']).subscribe((event: SportEvent) => { this.sportEvent = event; });
			}
		);
	}

	public cancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	public proceed() {
		this.eventService.removeUserFromEventAttending(+this.sportEvent.sportEventId).subscribe(result => {
				this.router.navigate(['../'], {relativeTo: this.route});
		});
	}
}