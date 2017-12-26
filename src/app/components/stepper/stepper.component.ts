import {
  AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, Input, OnInit,
  QueryList,
  ViewChildren, ViewEncapsulation
} from '@angular/core';
import {error} from 'util';
import {CdkStepper} from '@angular/cdk/stepper';
import {StepperNavComponent} from './stepper-nav/stepper-nav.component';
import {StepComponent} from './step/step.component';
import {takeUntil} from 'rxjs/operators';
import {state, style, trigger, transition, animate} from "@angular/animations";
import {stepperAnimation} from "../../animations/stepper.animation";


@Directive({
  selector: '[appStepper]'
})
export class StepperDirective extends CdkStepper implements AfterContentInit {
  @ViewChildren(StepperNavComponent, {read: ElementRef}) _stepHeader: QueryList<ElementRef>;
  @ContentChildren(StepComponent) _steps: QueryList<StepComponent>;

  ngAfterContentInit() {
    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());
  }
}


@Component({
  selector: 'app-stepper',
  exportAs: 'AppStepper',
  templateUrl: './stepper.component.pug',
  styleUrls: ['./stepper.component.sass'],
  inputs: ['selectedIndex'],
  host: {'class': 'app-stepper', 'role': 'tablist'},
  animations: stepperAnimation,
  providers: [{provide: StepperDirective, useExisting: StepperComponent}],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent extends StepperDirective {}
