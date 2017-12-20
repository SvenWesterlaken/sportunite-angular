import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {SharedModule} from './modules/shared.module';
import {AppRoutingModule} from './routes/app.routing.module';
import {SportEventModule} from './modules/sportevent.module';
import {AuthModule} from './modules/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    SportEventModule,
    AppRoutingModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
