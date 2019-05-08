import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

import { IDateTimeSlot } from '../datetimeslot/models';
import { IValue } from '../../models';

const onlyProps = props => obj => {
  return props
    .replace(/, /g, ',')
    .split(',')
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, Object.create(null));
};
const dtsProps = onlyProps('date, fromtime, totime');

@Component({
  // tslint:disable-next-line
  selector: 'container-dts',
  templateUrl: './container-dts.component.html',
  providers: [{
    provide: ContainerComponent,
    useExisting: forwardRef(() => ContainerDtsComponent)
  }],
})
export class ContainerDtsComponent
  extends ContainerComponent implements OnInit {
  @Input() dateLabel = '';
  @Input() startLabel = ' starting: ';
  @Input() endLabel = ' ending: ';

  // allow to override confg service settings for following props
  @Input() startTime;
  @Input() endTime;
  @Input() step;

  value = {
    date: null,
    fromtime: null,
    totime: null,
    valid: false,
  };

  dateformat: string;
  disabledDays = [];
  placeholder: string;

  ngOnInit() {
    const {
      dateformat,
      disabledDays,
      timeDropdown: { startTime, endTime, step },
    } = this.config;

    // use provided inputs or default to configuration set values
    this.startTime = this.startTime || startTime;
    this.endTime = this.endTime || endTime;
    this.step = this.step || step;

    this.dateformat = dateformat || 'mm/dd/yyyy';
    this.disabledDays = disabledDays;
    this.placeholder = dateformat.toUpperCase();
  }

  onchange(value) {
    if (value.type) {
      return;
    }
    Object.assign(this.value, dtsProps(value));
    this.notifyChange();
  }

  validateComponentValue() {
    const { date, fromtime, totime } = this.value;
    this.value.valid = Boolean(date && fromtime && totime);
  }
}
