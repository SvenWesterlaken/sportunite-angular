import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomErrorStateMatcher} from '../../../services/errorstate.manager';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private auth: AuthService, private errors: CustomErrorStateMatcher, private router: Router) {}

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      keep: new FormControl(null)
    });

  }

  submit() {
    this.auth.login(this.loginForm.value).then(() => {
      this.router.navigate(['/']);
    });
  }

}


