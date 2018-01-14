import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {SharedModule} from './modules/shared.module';
import {AppRoutingModule} from './routes/app.routing.module';

import {AuthGuard} from './other/auth.guard';

import {NotFoundComponent} from './components/not-found/not-found.component';
import {InnerModule} from './modules/inner.module';
import {MatIconRegistry} from '@angular/material';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    InnerModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
  }
}
