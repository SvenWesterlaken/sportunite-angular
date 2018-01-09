import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export function ValidateDateFormat(control: AbstractControl): ValidationErrors {
  return moment(control.value).isSame('0001-01-01') ? { dateFormat: true } : null;
}

export function MinimumTime(minControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl) => {
    const startTime = moment(minControl.value, 'HH:mm');
    const endTime = moment(control.value, 'HH:mm');
    return startTime.isBefore(endTime) ? null : { minTime: true };
  };
}

export function IsGreaterThan(min_control: AbstractControl): ValidatorFn {
  return (control: AbstractControl) => control.value >= min_control.value ? null : { isGreater: true };
}


