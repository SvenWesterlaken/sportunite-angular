import {SportEventAddComponent} from '../components/sportevent/sportevent-add/sportevent-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatInputModule, MatSelectModule} from '@angular/material';
import {EventService} from '../services/event.service';
import {StepperModule} from './stepper.module';
import {DatepickerModule} from './datepicker.module';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'angular2-moment';
import {SportEventComponent} from '../components/sportevent/sportevent.component';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SharedModule} from './shared.module';
import {SportEventRoutingModule} from '../routes/sportevent.routing.module';
import {NgModule} from '@angular/core/';

@NgModule({
  declarations: [
    SportEventComponent,
    SportEventListComponent,
    SportEventComponent,
    SportEventAddComponent
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
    MomentModule
  ],
  providers: [
    EventService
  ]
})
export class SportEventModule {}
