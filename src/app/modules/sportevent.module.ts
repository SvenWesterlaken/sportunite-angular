import {SportEventAddComponent} from '../components/sportevent/sportevent-add/sportevent-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatChipsModule, MatInputModule, MatSelectModule, MatSlideToggleModule} from '@angular/material';
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
import {NgModule} from '@angular/core/';
import {SharedModule} from './shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SportEventListFilterComponent} from '../components/sportevent/sportevent-list/sportevent-list-filter/sportevent-list-filter.component';
import {SportEventListItemComponent} from '../components/sportevent/sportevent-list/sportevent-list-item/sportevent-list-item.component';

@NgModule({
	declarations: [
		SportEventComponent,
		SportEventListComponent,
		SportEventAddComponent,
		SportEventDetailComponent,
		SportEventAttendComponent,
		SportEventListItemComponent,
		SportEventListFilterComponent
	],
	imports: [
		SharedModule,
		SportEventRoutingModule,
		ReactiveFormsModule,
		StepperModule,
		FormsModule,
		DatepickerModule,
		MatInputModule,
		HttpClientModule,
		MatSelectModule,
		MatCardModule,
		MatChipsModule,
		MatSlideToggleModule,
		MatProgressBarModule,
		MomentModule
	  ],
	  providers: [
		EventService
	  ]
})
export class SportEventModule {}
