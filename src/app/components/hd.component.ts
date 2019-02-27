import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ContainerComponent } from '../ui-containers/components';
import { ContentService } from '../services/content.service';

@Component({
  // tslint:disable-next-line
  selector: 'hd-root',
  templateUrl: './hd.component.html',
  styleUrls: ['./hd.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HDComponent
  implements AfterViewInit {

  validateWith = {
    projectNumber(value) {
      return /^\d{6}/.test(value) ? '' : 'should start with 6 digit base number';
    }
  };

  @ViewChild(ContainerComponent) rootContainer: ContainerComponent;

  constructor(private contentService: ContentService) { }

  ngAfterViewInit() {
    this.contentService.init(this.rootContainer);
  }

  // onContentChanged(value) {
  //   console.log('content chaged', value);
  // }
}
