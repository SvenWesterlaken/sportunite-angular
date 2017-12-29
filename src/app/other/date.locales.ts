import {Injectable} from '@angular/core';
import {MatDatepickerIntl} from '@angular/material';

@Injectable()
export class DateLocales extends MatDatepickerIntl {
  /** A label for the calendar popup (used by screen readers). */
  calendarLabel = 'Kalender';

  /** A label for the button used to open the calendar popup (used by screen readers). */
  openCalendarLabel = 'Open kalender';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Vorige maand';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Volgende maand';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Vorig jaar';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'Volgend jaar';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Ga naar maand overzicht';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToYearViewLabel = 'Ga naar jaar overzicht';
}
