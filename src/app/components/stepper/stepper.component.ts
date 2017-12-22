import {Component, Input, OnInit} from '@angular/core';
import {error} from 'util';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.pug',
  styleUrls: ['./stepper.component.sass']
})
export class StepperComponent implements OnInit {
  @Input() private size: number;
  private items;
  public selected = 0;

  constructor() {

  }

  ngOnInit() {
    this.items = Array(this.size).fill(1).map((x, i) => i);
    console.log(this.items);
  }

  next() {
    this.selected++;
  }

  previous() {
    this.selected--;
  }

  goTo(pos: number) {
    if (pos <= this.size) {
      this.selected = pos;
    } else {
      throw error('Position out of range.');
    }
  }

}
