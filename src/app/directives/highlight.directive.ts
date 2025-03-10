import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor() {}

  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = '#ccc';
  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.defaultColor;

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
