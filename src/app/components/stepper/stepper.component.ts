import {
  AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, forwardRef,
  HostListener,
  Inject, OnInit, QueryList, SkipSelf, ViewChildren, ViewEncapsulation
} from '@angular/core';
import {CdkStep, CdkStepper} from '@angular/cdk/stepper';
import {StepperNavComponent} from './stepper-nav/stepper-nav.component';
import {takeUntil} from 'rxjs/operators';
import {stepperAnimation} from '../../animations/stepper.animation';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';


// Step Component
@Component({
  selector: 'app-step',
  templateUrl: './step/step.component.pug',
  styleUrls: ['./step/step.component.sass']
})
export class StepComponent extends CdkStep implements ErrorStateMatcher {

  constructor(@Inject(forwardRef(() => StepperComponent)) stepper: StepperComponent,
              @SkipSelf() private _errorStateMatcher: ErrorStateMatcher) {
    super(stepper);
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }

}

// Stepper Directive
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

// Stepper Component
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
export class StepperComponent extends StepperDirective implements OnInit {
  private isSmallScreen;

  ngOnInit() {
    this.isSmallScreen = window.screen.width < 968;
  }

  // Change state when switching over media queries
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.screen.width < 968 && !this.isSmallScreen) {
      this.isSmallScreen = true;
    } else if (window.screen.width >= 968 && this.isSmallScreen) {
      this.isSmallScreen = false;

      // Update the transition state for all the steps
      this._steps.forEach((step: StepComponent, index: number) => {
        this.getAnimationDirection(index);
      });

    }
  }

  // Override the states on a small screen (for better animations)
  getAnimationDirection(index: number): string {
    const direction = super._getAnimationDirection(index);
    return window.screen.width < 968 ? `${direction}-small` : direction;
  }

}
