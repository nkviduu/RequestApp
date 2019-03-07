import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import * as dFormatter from 'dateformat';
import { INgxMyDpOptions, IMyDateModel, NgxMyDatePickerDirective } from 'ngx-mydatepicker';

const DEFAULT_DATE_FORMAT = 'yyyy-mm-dd';

@Component({
  // tslint:disable-next-line
  selector: 'rf-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
/**
 * Abstraction over external libraries implementation
 */
export class DatepickerComponent implements OnInit, AfterViewInit {
  @Input()
    set date(value: string | Date) {
      const date = typeof value === 'string'
        ? (!isNaN(Date.parse(value)) ? new Date(value) : undefined)
        : value;

      if (+date !== +this._date) {
        this._date = date;
        this.model = dateToModel(date);
      }
    }

  @Input()
    set dateFormat(value: string) {
      this._dateFormat = value || DEFAULT_DATE_FORMAT;
      this.options = { ...this.options, dateFormat: this._dateFormat };
      this.updateOptions();
    }

    get dateFormat() { return this._dateFormat || DEFAULT_DATE_FORMAT; }

  @Input() placeholder = '';
  @Input() disabledDays = [];

  @Output() dateChange = new EventEmitter<Date>();

  @ViewChild(NgxMyDatePickerDirective)
    ngxDatepicker: NgxMyDatePickerDirective;

  _date: Date;
  _dateFormat: string;
  primengFormatting = '';

  options: INgxMyDpOptions = {
    dateFormat: this.dateFormat,
    disableWeekends: true,
    selectorWidth: '220px',
    markCurrentDay: true,
    showTodayBtn: false,
    sunHighlight: false,
  };

  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.updateOptions();
  }

  updateOptions() {
    if (this.ngxDatepicker) {
      this.ngxDatepicker.parseOptions(this.options);
    }
  }

  onDateChanged(model) {
    const date = modelToDate(model);
    this._date = date;
    this.dateChange.emit(date);
  }
}

function dateToModel(date: Date) {
  return date && { date: {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }};
}

function modelToDate(model: IMyDateModel) {
  if (!model) {
    return null;
  }
  const { year, month, day } = model.date;
  return new Date(year, month - 1, day);
}
