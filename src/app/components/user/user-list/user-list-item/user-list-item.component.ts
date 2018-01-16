import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.pug',
  styleUrls: ['./user-list-item.component.sass']
})
export class UserListItemComponent implements OnInit {

    @Input() user;
    @Input() index: number;

  constructor() { }

  ngOnInit() { }

}
