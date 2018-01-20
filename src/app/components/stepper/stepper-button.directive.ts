import {Directive} from '@angular/core';
import {CdkStepper, CdkStepperNext, CdkStepperPrevious} from '@angular/cdk/stepper';
import {StepperComponent} from './stepper.component';

@Directive({
  selector: 'button[appStepperNext]',
  host: {'(click)': '_stepper.next()'},
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperButtonNextDirective extends CdkStepperNext {}

@Directive({
  selector: 'button[appStepperPrevious]',
  host: {'(click)': '_stepper.previous()'},
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperButtonPreviousDirective extends CdkStepperPrevious {}


