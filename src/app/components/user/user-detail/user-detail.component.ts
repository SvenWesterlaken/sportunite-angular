import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import * as moment from 'moment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.pug',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  private user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().then((user) => { this.user = user; });
  }

}
