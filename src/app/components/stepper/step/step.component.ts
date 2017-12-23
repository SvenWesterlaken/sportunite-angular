import {Component, forwardRef, Inject, OnInit, SkipSelf} from '@angular/core';
import {CdkStep} from "@angular/cdk/stepper";
import {ErrorStateMatcher} from "@angular/material";
import {StepperComponent} from "../stepper.component";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

@Component({
  selector: 'app-step',
  templateUrl: './step.component.pug',
  styleUrls: ['./step.component.sass']
})
export class StepComponent extends CdkStep implements ErrorStateMatcher {

  constructor(@Inject(forwardRef(() => StepperComponent)) stepper: StepperComponent, @SkipSelf() private _errorStateMatcher: ErrorStateMatcher) {
    super(stepper);
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }

}
