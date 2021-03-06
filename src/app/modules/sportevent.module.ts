import {SportEventAddComponent} from '../components/sportevent/sportevent-add/sportevent-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatCardModule, MatChipsModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule,
    MatTabsModule
} from '@angular/material';
import {EventService} from '../services/event.service';
import {StepperModule} from './stepper.module';
import {DatepickerModule} from './datepicker.module';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'angular2-moment';
import {SportEventComponent} from '../components/sportevent/sportevent.component';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventRoutingModule} from '../routes/sportevent.routing.module';
import {SportEventDetailComponent} from '../components/sportevent/sportevent-detail/sportevent-detail.component';
import {SportEventAttendComponent} from '../components/sportevent/sportevent-attend/sportevent-attend.component';
import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SportEventListFilterComponent} from '../components/sportevent/sportevent-list/sportevent-list-filter/sportevent-list-filter.component';
import {SportEventListItemComponent} from '../components/sportevent/sportevent-list/sportevent-list-item/sportevent-list-item.component';
import {SportEventLeaveComponent} from '../components/sportevent/sportevent-leave/sportevent-leave.component';
import {SportEventListUserComponent} from '../components/sportevent/sportevent-list-user/sportevent-list-user.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
	declarations: [
		SportEventComponent,
		SportEventListComponent,
		SportEventAddComponent,
		SportEventDetailComponent,
		SportEventListItemComponent,
		SportEventListFilterComponent,
		SportEventAttendComponent,
		SportEventLeaveComponent,
		SportEventListUserComponent
	],
	imports: [
		SharedModule,
		SportEventRoutingModule,
		ReactiveFormsModule,
		StepperModule,
		DatepickerModule,
		MatInputModule,
		HttpClientModule,
		MatSelectModule,
		MatCardModule,
		MatChipsModule,
		MatSlideToggleModule,
		MatProgressBarModule,
		MatTabsModule,
		MatProgressSpinnerModule,
    MatSnackBarModule,
		MomentModule
	],
	providers: [
		EventService
	]
})
export class SportEventModule {}
