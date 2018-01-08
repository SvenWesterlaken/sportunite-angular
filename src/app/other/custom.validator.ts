import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';

export function ValidateDateFormat(control: AbstractControl): ValidationErrors {
  return moment(control.value).isSame('0001-01-01') ? { dateFormat: true } : null;
}

export function MinimumTime(minControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl) => moment(control.value).isAfter(minControl.value) ? null : { minTime: true };
}

export function IsGreaterThan(min_control: AbstractControl): ValidatorFn {
  return (control: AbstractControl) => control.value >= min_control.value ? null : { isGreater: true };
}


