import { Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sportevent-list-filter',
  templateUrl: './sportevent-list-filter.component.pug',
  styleUrls: ['./sportevent-list-filter.component.sass']
})
export class SportEventListFilterComponent implements OnInit {

  color: string;

  filters = [
    { name: '2 km'},
    { name: '5 km' },
    { name: '10 km' },
    { name: '20 km' },
    { name: '∞' }

  ];

  @Output
  constructor() { }

  ngOnInit() {
  }

}
