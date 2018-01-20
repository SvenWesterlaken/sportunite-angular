import {ChangeDetectorRef, Component, ElementRef, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {StepperIntlService} from '../stepper-intl.service';
import {FocusMonitor} from '@angular/cdk/a11y';

@Component({
  selector: 'app-stepper-nav',
  templateUrl: './stepper-nav.component.pug',
  styleUrls: ['./stepper-nav.component.sass'],
  host: {'class': 'app-stepper-nav', 'role': 'tab'}
})
export class StepperNavComponent implements OnDestroy {
  private _intlSubscription: Subscription;

  @Input() icon: string;

  @Input()
  get index() { return this._index; }
  set index(value: any) { this._index = coerceNumberProperty(value); }
  private _index: number;

  @Input()
  get selected() { return this._selected; }
  set selected(value: any) { this._selected = coerceBooleanProperty(value); }
  private _selected: boolean;

  @Input()
  get active() { return this._active; }
  set active(value: any) { this._active = coerceBooleanProperty(value); }
  private _active: boolean;

  @Input()
  get optional() { return this._optional; }
  set optional(value: any) { this._optional = coerceBooleanProperty(value); }
  private _optional: boolean;

  constructor(public _intl: StepperIntlService, private _focusMonitor: FocusMonitor,
              private _element: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    _focusMonitor.monitor(_element.nativeElement, true);
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element.nativeElement);
  }

  _getHostElement() {
    return this._element.nativeElement;
  }

}
