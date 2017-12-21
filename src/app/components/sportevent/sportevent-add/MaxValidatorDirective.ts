import {Directive, Input} from "@angular/core";
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
	selector: '[app-min-valid]',
	providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator {
	@Input() minimumNumber: number = 1;
	
	constructor() {
	}
	
	validate(control: FormControl): ValidationErrors {
		const currentValue = control.value;
		const isValid = currentValue >= this.minimumNumber;
		
		return isValid ? null : {
			minimumNumber: {
				valid: false
			}
		}
	}
}