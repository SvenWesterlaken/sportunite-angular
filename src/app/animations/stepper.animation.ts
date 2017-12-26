import {trigger, state, style, transition, animate, keyframes, group} from '@angular/animations';

// Variables

// Durations in milliseconds
const outDuration = 300;
const inDuration = 350;

// Easing in cubic bezier functions
const outEasing = 'cubic-bezier(0.4, 0.0, 0.6, 1)';
const inEasing = 'cubic-bezier(0.0, 0.0, 0.2, 1)';



export const stepperAnimation = [
  trigger('stepTransition', [
    state('previous', style({
      height: '0px',
      visibility: 'hidden',
      opacity: 0,
      transform: 'translate3d(0, -100%, 0)'
    })),
    state('next', style({
      height: '0px',
      visibility: 'hidden',
      opacity: 0,
      transform: 'translate3d(0, 100%, 0)'
    })),
    state('current', style({
      height: '*',
      visibility: 'visible',
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    })),
    // From previous & next to current
    transition('* => current', group([
      animate(`${inDuration}ms ${outDuration}ms ${inEasing}`, style({
        transform: 'translate3d(0,0,0)',
        opacity: 1
      })),
      animate(`0s ${outDuration}ms`, style({
        visibility: 'visible',
        height: '*'
      }))
    ])),
    // From current to next
    transition('current => next', group([
      animate(`${outDuration}ms ${outEasing}`, style({
        transform: 'translate3d(0,100%,0)',
        opacity: 1
      })),
      animate(`0s ${outDuration}ms`, style({
        visibility: 'visible',
        height: '*'
      }))
    ])),
    // From current to previous
    transition('current => previous', group([
      animate(`${outDuration}ms ${outEasing}`, style({
        transform: 'translate3d(0,-100%,0)',
        opacity: 1
      })),
      animate(`0s ${outDuration}ms`, style({
        visibility: 'visible',
        height: '*'
      }))
    ]))
  ])
];
