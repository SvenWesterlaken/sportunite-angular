import {trigger, state, style, transition, animate, group} from '@angular/animations';

// Variables

// Percentage of how much the step is translated equal to its height (larger screens only)
const translateAmount = 50;

// Percentage of how much the step is translated equal to screen width (small screens only)
const translateAmountSmall = 100;

// Durations in milliseconds
const outDuration = 300;
const inDuration = 350;

// Easing in cubic bezier functions
const outEasing = 'cubic-bezier(0.4, 0.0, 0.6, 1)';
const inEasing = 'cubic-bezier(0.0, 0.0, 0.2, 1)';



export const stepperAnimation = [
  trigger('stepTransition', [
    //
    // ----------------------------------------------------------------------
    // Normal Screen States
    // ----------------------------------------------------------------------
    //
    state('previous', style({
      height: '0px',
      visibility: 'hidden',
      opacity: 0,
      transform: `translate3d(0, -${translateAmount}%, 0)`
    })),
    state('next', style({
      height: '0px',
      visibility: 'hidden',
      opacity: 0,
      transform: `translate3d(0, ${translateAmount}%, 0)`
    })),
    state('current', style({
      height: '*',
      visibility: 'visible',
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    })),
    //
    // ----------------------------------------------------------------------
    // Small Screen States
    // ----------------------------------------------------------------------
    //
    state('previous-small', style({
      height: '*',
      visibility: 'hidden',
      opacity: 1,
      transform: 'translate3d(-100%, 0, 0)'
    })),
    state('next-small', style({
      height: '*',
      visibility: 'hidden',
      opacity: 1,
      transform: 'translate3d(100%, 0, 0)'
    })),
    state('current-small', style({
      height: '*',
      visibility: 'visible',
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    })),
    // ----------------------------------------------------------------------
    //
    // Transitions
    //
    // ----------------------------------------------------------------------
    //
    // ----------------------------------------------------------------------
    // From previous & next to current
    // ----------------------------------------------------------------------
    //
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
    //
    // ----------------------------------------------------------------------
    // From current to next (Large Screen)
    // ----------------------------------------------------------------------
    //
    transition('current => next', group([
      animate(`${outDuration}ms ${outEasing}`, style({
        transform: `translate3d(0, ${translateAmount}%, 0)`,
        opacity: 0
      })),
      animate(`0s ${outDuration}ms`, style({
        visibility: 'visible',
        height: '*'
      }))
    ])),
    //
    // ----------------------------------------------------------------------
    // From current to previous (Large Screen)
    // ----------------------------------------------------------------------
    //
    transition('current => previous', group([
      animate(`${outDuration}ms ${outEasing}`, style({
        transform: `translate3d(0, -${translateAmount}%, 0)`,
        opacity: 0
      })),
      animate(`0s ${outDuration}ms`, style({
        visibility: 'visible',
        height: '*'
      }))
    ])),
    //
    // ----------------------------------------------------------------------
    // Small Screen transitions
    // ----------------------------------------------------------------------
    //
    transition('current-small <=> next-small', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
    transition('current-small <=> previous-small', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
  ])
];
