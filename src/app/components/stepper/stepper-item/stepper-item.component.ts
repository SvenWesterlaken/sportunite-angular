import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stepper-item',
  templateUrl: './stepper-item.component.pug',
  styleUrls: ['./stepper-item.component.sass']
})
export class StepperItemComponent implements OnInit {
  @Input() private item: number;
  private selected = false;

  constructor() { }

  ngOnInit() {
  }

  onSelect() {
    this.selected = !this.selected;
  }

}
