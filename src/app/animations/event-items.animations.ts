import {animate, state, style, transition, trigger} from '@angular/animations';

export const eventItemAnimation = trigger('eventAnimation', [
  state('in', style({transform: 'translateY(0)', opacity: 1})),
  transition('void => *', [
    style({transform: 'translateY(50%)', opacity: 0}),
    animate('215ms cubic-bezier(0.0, 0.0, 0.2, 1)')
  ]),
  transition('* => void', [
    animate(100, style({transform: 'translateX(-50%)', opacity: 0}))
  ])
]);
