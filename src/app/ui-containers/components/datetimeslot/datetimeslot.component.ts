import {
  Component,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation } from '@angular/core';

// import dateFormat without * as fails in karma / jasmine tests as it finds dateFormat undefined
import * as dateFormat from 'dateformat';

import { TimeUtil } from '../../../utils/time-util';
import { IDateTimeSlot } from './models';

const { buildListFromTo, minToTime, timeToMin, addTime } = TimeUtil;

@Component({
  // tslint:disable-next-line
  selector: 'vt-datetimeslot',
  templateUrl: './datetimeslot.component.html',
  styleUrls: ['./datetimeslot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatetimeslotComponent implements OnInit {
  FROM_TIME = 'fromtime';
  TO_TIME = 'totime';

  @Input() dateLabel = 'Date: ';
  @Input() startLabel = ' starting: ';
  @Input() endLabel = ' ending: ';

  @Input() date: string | Date = null;
  @Input() dateFormat = 'mm/dd/yy';
  @Input() disabledDays = [0, 6];
  @Input() placeholder = 'Enter date..';

  @Input() set fromtime(value: string) { this.setFromTime(value, false); }
  @Input() set totime(value: string) { this.setToTime(value, false); }

  @Input() startTime = '8:00 AM';
  @Input() endTime = '7:00 PM';
  @Input() step = 10;

  @Output() change = new EventEmitter<IDateTimeSlot>();

  currentSelection: IDateTimeSlot = {
    date: null,
    fromtime: '',
    totime: '',
    valid: false
  };

  get dropdownLists() {
    const { startTime, endTime, step, currentSelection: { fromtime } } = this;

    return [
      buildListFromTo(
        startTime,
        addTime(endTime, -step),
        +step,
        false,
        false),
      buildListFromTo(
        addTime(fromtime || startTime, step),
        endTime,
        +step,
        false,
        !!fromtime)
    ];
  }

  ngOnInit() {
  }

  changeDate(value: Date) {
    const { date } = this;
    if (date && (date.toString() === value.toString())) {
      return;
    }
    this.date = value;
    this.notify();
  }

  setToTime(value, isInternal = true) {
    const { currentSelection } = this;
    if (currentSelection.totime === value) {
      return;
    }
    currentSelection.totime = value;
    if (isInternal) {
      this.notify();
    }
  }

  setFromTime(value, isInternal = true) {
    const { endTime, step, currentSelection: { fromtime, totime } } = this;
    if (fromtime === value) {
      return;
    }

    const currentDiff = diffInSteps(fromtime, totime);
    this.currentSelection.fromtime = value;
    // from time change may change to end time
    const fromMin = timeToMin(value);
    const toMin = timeToMin(totime);

    if (fromMin >= (toMin - (currentDiff))) {
      const newToTimeMin = fromMin + (currentDiff);
      const newToTime = (newToTimeMin <= timeToMin(endTime))
        ? minToTime(newToTimeMin)
        : '';

      this.currentSelection.totime = newToTime;
    }
    if (isInternal) {
      this.notify();
    }

    function diffInSteps(from, to) {
      return from && to
        ? (timeToMin(to) - timeToMin(from))
        : 0;
    }
  }

  notify() {
    this.validate();
    const { date, currentSelection: { fromtime, totime, valid } } = this;
    this.change.emit({ date, fromtime, totime, valid });
  }

  validate() {
    const { date, currentSelection: { fromtime, totime } } = this;
    this.currentSelection.valid = Boolean(date && fromtime && totime);
  }
}
