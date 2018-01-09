import {NgModule} from '@angular/core';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventRoutingModule} from '../routes/sportevent.routing.module';
import {SportEventComponent} from '../components/sportevent/sportevent.component';
import {SharedModule} from './shared.module';
import {SportEventAddComponent} from "../components/sportevent/sportevent-add/sportevent-add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material";
import {MatSelectModule, MatCardModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EventService} from "../services/event.service";
import {HttpClientModule} from "@angular/common/http";
import {StepperModule} from "./stepper.module";
import {DatepickerModule} from "./datepicker.module";
import {SportEventAttendComponent} from "../components/sportevent/sportevent-attend/sportevent-attend.component";
import {SportEventDetailComponent} from "../components/sportevent/sportevent-detail/sportevent-detail.component";
import {MomentModule} from 'angular2-moment';

@NgModule({
	declarations: [
		SportEventComponent,
		SportEventListComponent,
		SportEventAddComponent,
		SportEventDetailComponent,
		SportEventAttendComponent,
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
    MomentModule
  ],
  providers: [
    EventService
  ]

})
export class SportEventModule {}
