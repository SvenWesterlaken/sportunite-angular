import {StepComponent, StepperComponent} from '../components/stepper/stepper.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepperNavComponent} from '../components/stepper/stepper-nav/stepper-nav.component';
import {
  StepperButtonNextDirective,
  StepperButtonPreviousDirective
} from '../components/stepper/stepper-button.directive';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {StepperIntlService} from '../components/stepper/stepper-intl.service';
import {ErrorStateMatcher} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {PortalModule} from '@angular/cdk/portal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    StepperComponent,
    StepComponent,
    StepperNavComponent,
    StepperButtonNextDirective,
    StepperButtonPreviousDirective
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    A11yModule,
    PortalModule,
    BrowserAnimationsModule
  ],
  exports: [
    StepperComponent,
    StepComponent,
    StepperNavComponent,
    StepperButtonNextDirective,
    StepperButtonPreviousDirective
  ],
  providers: [
    StepperIntlService,
    ErrorStateMatcher
  ]
})
export class StepperModule {}
