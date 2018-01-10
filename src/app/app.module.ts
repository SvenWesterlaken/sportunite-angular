import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {SharedModule} from './modules/shared.module';
import {AppRoutingModule} from './routes/app.routing.module';

import {AuthGuard} from './other/auth.guard';
import {SportEventModule} from './modules/sportevent.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {InnerModule} from './modules/inner.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    InnerModule,
    SportEventModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
