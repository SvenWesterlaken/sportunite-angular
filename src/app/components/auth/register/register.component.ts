import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import {StepperComponent} from '../../stepper/stepper.component';
import * as moment from 'moment';
import {ValidateDateFormat} from '../../../other/date.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  private maxDate = moment();
  private registerForm: FormGroup;
  @ViewChild(StepperComponent) stepper: StepperComponent;

  constructor() { }

  ngOnInit() {
    const passwordControl = new FormControl(null, Validators.required);

    this.registerForm = new FormGroup({
      registerName: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
      }),
      registerEmail: new FormGroup({
        email: new FormControl(null, [Validators.required, CustomValidators.email])
      }),
      registerBirth: new FormGroup({
        birth: new FormControl(moment().subtract(1, 'days'), [Validators.required, ValidateDateFormat, CustomValidators.maxDate(moment().format())])
      }),
      registerGender: new FormGroup({
        gender: new FormControl(null, Validators.required)
      }),
      registerAddress: new FormGroup({
        postalCode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{3}(?!sa|sd|ss)[a-z]{2}$/i)]),
        number: new FormControl(null, [Validators.required, CustomValidators.digits, Validators.maxLength(3)]),
        suffix: new FormControl(null, Validators.maxLength(1))
      }),
      registerAddressConfirmation: new FormGroup({
        street: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        country: new FormControl('Nederland', Validators.required)
      }),
      registerPassword: new FormGroup({
        password: passwordControl,
        passwordConfirmation: new FormControl(null, [Validators.required, CustomValidators.equalTo(passwordControl)])
      })
    });
  }

}
