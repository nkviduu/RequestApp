import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'rf-up',
  template: `<div class="up" (click)="scrollToTop()"><span>⍐</span></div>`,
  styles: [`
    .up {
      font-size: 1.7rem;
      line-height: 1;
      height: 1.8rem;
      margin: 0;
      font-weight: 700;
      color: #aaa;
      cursor: pointer;
      transition: all 350ms;
      max-height: 1px;
      overflow: hidden;
    }
    .up-visible {
      max-height: 30px;
    }
  `]
})
export class UpComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    let prevRatio = 0;
    if ('IntersectionObserver' in window) {
      const observerObj = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          const { isIntersecting, intersectionRatio } = entry;

          entry
            .target
            .firstElementChild
            .classList
            .toggle('up-visible', intersectionRatio < prevRatio);

          prevRatio = intersectionRatio;
        });
      },
      {
        threshold: [.95, 1],
        rootMargin: '-125px 0px 0px 0px',
      });
      observerObj.observe(this.el.nativeElement);
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  // hide if not at the top of window
  scrollToSelf() {
    this.el.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}
