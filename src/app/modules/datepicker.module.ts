import {NgModule} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerIntl,
  MatDatepickerModule
} from '@angular/material';
import {DateLocales} from '../other/date.locales';
import {MomentDateAdapter} from "../other/date.adapter";

const formats = {
  parse: {
    dateInput: 'D MMMM, YYYY'
  },
  display: {
    dateInput: 'D MMMM, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'D MMMM, YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    MatDatepickerModule
  ],
  exports: [
    MatDatepickerModule
  ],
  providers: [
    {provide: MatDatepickerIntl, useClass: DateLocales},
    {provide: MAT_DATE_FORMATS, useValue: formats},
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'nl'}
  ]
})

export class DatepickerModule {}
