import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NavItemsAnimation} from '../../animations/nav-items.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.sass'],
  animations: NavItemsAnimation
})
export class HeaderComponent {
  private opened = false;

  constructor(private auth: AuthService) {}

  toggleNav() {
    this.opened = !this.opened;
  }

  logout() {
    this.auth.logout();
  }

}
