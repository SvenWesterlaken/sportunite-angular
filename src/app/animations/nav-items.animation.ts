import {animate, animateChild, query, stagger, state, style, transition, trigger} from "@angular/animations";

export const NavItemsAnimation = [
    trigger('navItemsAnimation', [
        transition('false => true', [
            query('@navItemAnimation', stagger(100, [animateChild()]))
        ]),
        transition('true => false', [
            query('@navItemAnimation', stagger(50, [animateChild()]))
        ])
    ]),
    trigger('navItemAnimation', [
        state('false', style({opacity: 0, transform: 'translateY(-100%)', visibility: 'hidden'})),
        state('true', style({opacity: 1, transform: 'translateY(0)', visibility: 'visible'})),
        transition('false => true', animate('250ms ease-in-out')),
        transition('true => false', animate('150ms ease-in-out', style({opacity: 0})))
    ])
];
