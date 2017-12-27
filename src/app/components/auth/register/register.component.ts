import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { CustomValidators } from "ng4-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      registerName: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
      }),
      registerEmail: new FormGroup({
        email: new FormControl(null, Validators.required)
      }),
      registerBirth: new FormGroup({
        birth: new FormControl(null, Validators.required)
      }),
      registerGender: new FormGroup({
        gender: new FormControl(null, Validators.required)
      }),
      registerAddress: new FormGroup({
        postalCode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{3}(?!sa|sd|ss)[a-z]{2}$/i)]),
        number: new FormControl(null, [Validators.required, CustomValidators.digits, Validators.maxLength(3)])
      }),
      registerAddressConfirmation: new FormGroup({
        street: new FormControl(null, Validators.required),
        suffix: new FormControl(null, Validators.maxLength(1)),
        city: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        country: new FormControl('Nederland', Validators.required)
      })
    });

  }

}
