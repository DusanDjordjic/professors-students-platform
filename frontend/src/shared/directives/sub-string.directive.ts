import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSubString]',
})
export class SubStringDirective implements AfterViewInit {
  @Input('length') length: number = 100;
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    const el = this.el.nativeElement as HTMLElement;
    if (el.textContent) {
      if (el.textContent.length < this.length) return;
      el.textContent = this.getSubString(el.textContent);
    }
  }
  getSubString(text: string) {
    return text.substring(0, this.length - 3) + '...';
  }
}
