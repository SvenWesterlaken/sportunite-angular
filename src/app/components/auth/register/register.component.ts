import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import {StepperComponent} from '../../stepper/stepper.component';
import * as moment from 'moment';
import {ValidateDateFormat} from '../../../other/custom.validator';
import {AddressService} from '../../../services/address.service';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Address} from '../../../models/address';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from "../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild(StepperComponent) stepper: StepperComponent;

  private maxDate = moment();
  private addressSub: Subscription;
  private registerForm: FormGroup;
  private address: Address;
  private addressLoading = false;


  constructor(private addressService: AddressService, private auth: AuthService, private router: Router) { }

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
        birth: new FormControl(moment().subtract(1, 'days'), [
          Validators.required,
          ValidateDateFormat,
          CustomValidators.maxDate(moment().format())])
      }),
      registerGender: new FormGroup({
        gender: new FormControl(null, Validators.required)
      }),
      registerAddress: new FormGroup({
        postalCode: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]{3}(?!sa|sd|ss)[a-z]{2}$/i),
          Validators.maxLength(6)]),
        number: new FormControl(null, [Validators.required, CustomValidators.digits, Validators.maxLength(4)]),
        suffix: new FormControl(null)
      }),
      registerPassword: new FormGroup({
        password: passwordControl,
        passwordConfirmation: new FormControl(null, [Validators.required, CustomValidators.equalTo(passwordControl)])
      })
    });
  }

  ngOnDestroy() {
    this.addressSub.unsubscribe();
  }

  getAddress() {
    this.addressLoading = true;
    this.requestAddress();
  }

  cancelAddress() {
    this.stepper.previous();
    this.address = null;
  }

  requestAddress() {
    const values = this.registerForm.value.registerAddress;
    this.addressSub = this.addressService.getAddress(values.postalCode, values.number, values.suffix).subscribe((response: Address) => {
      this.addressLoading = false;
      this.address = response;
      this.stepper.next();
    }, (err: HttpErrorResponse) => {

      this.addressLoading = false;

      if (err.status === 404 && err.error.error === 'No address with this suffix') {
        this.registerForm.get('registerAddress.suffix').setErrors({noAddress: true});
      } else if (err.status === 404 && err.error.error === 'No address found') {
        this.registerForm.get('registerAddress.postalCode').setErrors({noAddress: true});
        this.registerForm.get('registerAddress.number').setErrors({noAddress: true});
      }
    });
  }

  register() {
    const form = this.registerForm.value;


    const userObject: User = {
      email: form.registerEmail.email,
      password: form.registerPassword.password,
      firstname: form.registerName.firstName,
      lastname: form.registerName.lastName,
      birth: moment(form.registerBirth.birth).toDate(),
      gender: form.registerGender .gender,
      address: {
        street: this.address.street,
        number: this.address.number,
        suffix: this.address.suffix,
        postal_code: this.address.postal_code,
        city: this.address.city,
        state: this.address.state,
        geometry: {
          coordinates: this.address.coordinates
        }
      }
    };

    console.log(userObject);

    this.auth.register(userObject).subscribe((res) => this.router.navigate(['sportevent']), (err) => console.log(err));


  }

}
