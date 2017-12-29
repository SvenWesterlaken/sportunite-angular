import {NgModule} from '@angular/core';
import {LoginComponent} from '../components/auth/login/login.component';
import {RegisterComponent} from '../components/auth/register/register.component';
import {AuthRoutingModule} from '../routes/auth.routing.module';
import {SharedModule} from './shared.module';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {StepperModule} from './stepper.module';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {DatepickerModule} from "./datepicker.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    StepperModule,
    DatepickerModule
  ]
})
export class AuthModule {}
