import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from '../components/not-found/not-found.component';

const routes = [
  { path: '', redirectTo: 'sportevent', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
