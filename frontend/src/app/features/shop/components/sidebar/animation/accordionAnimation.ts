import {animate, AnimationTriggerMetadata, style, transition, trigger} from "@angular/animations";

export const accordionAnimation: AnimationTriggerMetadata = trigger("expandCollapse", [
  transition(":enter", [
    style({
      height: "0"
    }),
    animate("300ms ease-in", style({
      height: "*"
    }))
  ]),
  transition(":leave", [
    style({
      height: "*"
    }),
    animate("300ms ease-in", style({
      height: "0"
    }))
  ])
]);
