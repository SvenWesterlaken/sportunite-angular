import {Directive, Input} from "@angular/core";
import {FormControl, NG_VALIDATORS, ValidationErrors} from "@angular/forms";

@Directive({
	selector: '[app-form-valid]',
	providers: [{provide: NG_VALIDATORS, useExisting: FormInputValidatorDirective, multi: true}]
})
export class FormInputValidatorDirective {
	@Input() minimumValue;
	
	constructor() {
	}
	
	validate(control: FormControl): ValidationErrors {
		const currentValue = control.value;
		const isValid = currentValue >= this.minimumValue;
		
		return isValid ? null : {
			minimumValue: {
				valid: false
			}
		}
	}
}