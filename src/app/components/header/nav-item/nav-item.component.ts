import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.pug',
  styleUrls: ['./nav-item.component.sass']
})
export class NavItemComponent implements OnInit {
  @Input('icon') icon;
  @Input('name') name;
  @Input('link') link;

  constructor() { }

  ngOnInit() {}

}
