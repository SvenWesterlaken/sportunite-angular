import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {SharedModule} from './modules/shared.module';
import {AppRoutingModule} from './routes/app.routing.module';
import {SportEventModule} from './modules/sportevent.module';
import {AuthModule} from './modules/auth.module';
import {AuthGuard} from './other/auth.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    SportEventModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
