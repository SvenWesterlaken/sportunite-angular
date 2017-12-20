import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-sportevent-list',
	templateUrl: './sportevent-list.component.pug',
	styleUrls: ['./sportevent-list.component.sass']
})
export class SportEventListComponent implements OnInit {
	
	constructor(private router: Router, private route: ActivatedRoute) {
	}
	
	ngOnInit() {
	}
	
	onCreateNewEvent() {
		this.router.navigate(['add'], {relativeTo: this.route});
	}
	
}
