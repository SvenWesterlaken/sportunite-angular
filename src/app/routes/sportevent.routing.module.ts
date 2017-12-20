import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../components/auth/login/login.component';
import {RegisterComponent} from '../components/auth/register/register.component';
import {SportEventListComponent} from '../components/sportevent/sportevent-list/sportevent-list.component';
import {SportEventComponent} from '../components/sportevent/sportevent.component';

const routes = [
  { path: 'sportevent', component: SportEventComponent, children: [
      { path: '', component: SportEventListComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SportEventRoutingModule {}
