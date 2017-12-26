import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomErrorStateMatcher} from '../other/errorstate.manager';
import {StepperComponent} from '../components/stepper/stepper.component';

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
  providers: [CustomErrorStateMatcher]
})
export class SharedModule { }
