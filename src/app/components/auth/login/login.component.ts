import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomErrorStateMatcher} from '../../../other/errorstate.manager';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthService, public errors: CustomErrorStateMatcher, private router: Router) {}

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
    }).catch((res: HttpErrorResponse) => {
      if (res.status === 0) {
        this.loginForm.setErrors({
          'noConnection': true
        });
      } else if (res.status === 404) {
        this.loginForm.get('email').setErrors({
          'notFound': true
        });
      } else if (res.status === 401) {
        this.loginForm.get('password').setErrors({
          'invalidPassword': true
        });
      }
    });
  }

}


