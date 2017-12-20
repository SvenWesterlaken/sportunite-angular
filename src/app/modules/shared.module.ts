import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomErrorStateMatcher} from '../services/errorstate.manager';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [CustomErrorStateMatcher],
  declarations: []
})
export class SharedModule { }
