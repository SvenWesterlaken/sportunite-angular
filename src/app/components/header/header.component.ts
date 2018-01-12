import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {animate, animateChild, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.sass'],
  animations: [
      trigger('navItemsAnimation', [
          transition('* => *', [
              query('@navItemAnimation', stagger(100, [animateChild()]))
          ])
      ]),
      trigger('navItemAnimation', [
          state('false', style({opacity: 0, transform: 'translateY(-100%)', visibility: 'hidden'})),
          state('true', style({opacity: 1, transform: 'translateY(0)', visibility: 'visible'})),
          transition('false => true', animate('250ms ease-in-out'))
      ])
  ]
})
export class HeaderComponent {
  // @ViewChildren(NavItemComponent) navItems: QueryList<NavItemComponent>;
  private opened = false;

  constructor(private auth: AuthService) {}

  toggleNav() {
    this.opened = !this.opened;
  }

  logout() {
    this.auth.logout();
  }

}
