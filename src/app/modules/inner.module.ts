import {NgModule} from '@angular/core';
import {AuthModule} from './auth.module';
import {SportEventModule} from './sportevent.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../services/auth.interceptor';
import {UserModule} from "./user.module";

@NgModule({
  imports: [
    AuthModule,
    SportEventModule,
    UserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class InnerModule {}
