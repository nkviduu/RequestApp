import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { fadeInAnimation, fadeAnimation } from '../../utils/animations';

@Component({
  selector: 'rf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None,

})
export class AboutComponent implements OnInit {
  @ViewChild('submenu') submenu: ElementRef;

  // temp only
  testDate = '';
  dateChanged = (value) => console.log(`date changed to ${value}`);

  ngOnInit() { }

  getRouterOutletState(outlet: RouterOutlet) {
    return {
      value: outlet.isActivated ? outlet.activatedRoute.snapshot.url.toString() : '',
      params: { transition_duration: '.3s' }
    };
  }

  scrollIntoView(el) {
    setTimeout(() => {
      (el || this.submenu.nativeElement)
        .scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 350);
  }
}
