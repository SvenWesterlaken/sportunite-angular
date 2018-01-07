import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventComponent} from '../components/sportevent/sportevent.component';

import {SporteventAddComponent} from "../components/sportevent/sportevent-add/sportevent-add.component";
import {AuthGuard} from "../other/auth.guard";

const routes = [
	{
		path: 'sportevent',
		component: SportEventComponent,
    canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: SportEventListComponent
			},
			{
				path: 'add',
				component: SporteventAddComponent
			}
		]
	}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class SportEventRoutingModule {
}
