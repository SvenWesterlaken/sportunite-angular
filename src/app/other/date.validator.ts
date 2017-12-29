import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';

export function ValidateDateFormat(control: AbstractControl) {
  return moment(control.value).isSame('0001-01-01') ? { dateFormat: true } : null;
}


