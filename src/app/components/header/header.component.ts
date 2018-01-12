import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  private opened = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {}

  toggleNav() {
    this.opened = !this.opened;
  }

  logout() {
    this.auth.logout();
  }

}
