import {NgModule} from '@angular/core';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventRoutingModule} from '../routes/sportevent.routing.module';
import {SportEventComponent} from '../components/sportevent/sportevent.component';
import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    SportEventComponent,
    SportEventListComponent
  ],
  imports: [
    SharedModule,
    SportEventRoutingModule
  ]
})
export class SportEventModule { }
