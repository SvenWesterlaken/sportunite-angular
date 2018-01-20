import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class StepperIntlService {

  changes: Subject<void> = new Subject<void>();
  optionalLabel = 'Optioneel';

}
