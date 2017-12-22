import {StepperComponent} from '../components/stepper/stepper.component';
import {NgModule} from '@angular/core';
import {StepperItemComponent} from '../components/stepper/stepper-item/stepper-item.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    StepperComponent,
    StepperItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StepperComponent,
    StepperItemComponent
  ]
})
export class StepperModule {}
