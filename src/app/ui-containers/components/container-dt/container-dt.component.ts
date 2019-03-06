import { Component, OnInit, Input, forwardRef } from '@angular/core';

import { ContainerComponent } from '../container/container.component';
import { IValue } from '../../models';

@Component({
  selector: 'container-dt',
  templateUrl: './container-dt.component.html',
  providers: [{
    provide: ContainerComponent,
    useExisting: forwardRef(() => ContainerDtComponent)
  }],
})
export class ContainerDtComponent
  extends ContainerComponent
  implements OnInit {
  value = {
    date: null,
    valid: false
  };
  dateformat: string;
  disabledDays = [];
  placeholder: string;

  ngOnInit() {
    this.dateformat = this.config.dateformat || 'mm/dd/yyyy';
    this.disabledDays = this.config.disabledDays;
    this.placeholder = this.dateformat.toUpperCase();
  }

  onchange(value) {
    this.value.date = value;
    this.notifyChange();
  }

  validateComponentValue() {
    this.value.valid = !!this.value.date;
  }
}
