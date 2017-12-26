import {NgModule} from '@angular/core';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventRoutingModule} from '../routes/sportevent.routing.module';
import {SportEventComponent} from '../components/sportevent/sportevent.component';
import {SharedModule} from './shared.module';
import {SporteventAddComponent} from "../components/sportevent/sportevent-add/sportevent-add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material";
import {MatSelectModule, MatCardModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormInputValidatorDirective} from "../components/sportevent/sportevent-add/forminputvalidator.directive";
import {EventService} from "../services/event.service";
import {HttpModule} from "@angular/http";
import {StepperModule} from "./stepper.module";

@NgModule({
	declarations: [
		SportEventComponent,
		SportEventListComponent,
		SporteventAddComponent,
		FormInputValidatorDirective
	],
	imports: [
		SharedModule,
		SportEventRoutingModule,
		ReactiveFormsModule,
		StepperModule,
		FormsModule,
		MatInputModule,
		BrowserAnimationsModule,
		HttpModule,
		MatSelectModule,
		MatCardModule
	],
	providers: [
		EventService
	]

})
export class SportEventModule {
}
