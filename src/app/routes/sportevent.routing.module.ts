import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventComponent} from '../components/sportevent/sportevent.component';
import {SportEventAttendComponent} from '../components/sportevent/sportevent-attend/sportevent-attend.component';
import {SportEventDetailComponent} from '../components/sportevent/sportevent-detail/sportevent-detail.component';
import {SportEventAddComponent} from '../components/sportevent/sportevent-add/sportevent-add.component';
import {AuthGuard} from '../other/auth.guard';
import {SportEventLeaveComponent} from "../components/sportevent/sportevent-leave/sportevent-leave.component";
import {SportEventListUserComponent} from "../components/sportevent/sportevent-list-user/sportevent-list-user.component";


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
				component: SportEventAddComponent
			},
			{
				path: 'organised',
				component: SportEventListUserComponent
			},
			{
				path: ':id',
				component: SportEventDetailComponent,
			},
			{
				path: ':id/attend',
				component: SportEventAttendComponent
			},
			{
				path: ':id/leave',
				component: SportEventLeaveComponent
			}
		]
	}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class SportEventRoutingModule {}
