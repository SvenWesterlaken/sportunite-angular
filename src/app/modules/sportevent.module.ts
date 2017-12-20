import {NgModule} from '@angular/core';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventRoutingModule} from '../routes/sportevent.routing.module';
import {SportEventComponent} from '../components/sportevent/sportevent.component';
import {SharedModule} from './shared.module';
import {SporteventAddComponent} from "../components/sportevent/sportevent-add/sportevent-add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material";
import {MatSelectModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
	declarations: [
		SportEventComponent,
		SportEventListComponent,
		SporteventAddComponent
	],
	imports: [
		SharedModule,
		SportEventRoutingModule,
		ReactiveFormsModule,
		MatInputModule,
		BrowserAnimationsModule,
		MatSelectModule
	]
})
export class SportEventModule {
}
