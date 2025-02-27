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
  @Output() colorChange = new EventEmitter<string>();

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
    this.colorChange.emit(this.backgroundColor);
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
    this.colorChange.emit(this.backgroundColor);
  }
}
