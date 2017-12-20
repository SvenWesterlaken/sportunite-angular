import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../components/auth/login/login.component';

const routes = [
  { path: '', redirectTo: '/sportevent', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
