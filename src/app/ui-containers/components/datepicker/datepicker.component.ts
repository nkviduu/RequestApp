import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import * as dFormatter from 'dateformat';

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
export class DatepickerComponent implements OnInit {
  @Input()
    set date(value: string | Date) {
      const date = typeof value === 'string'
        ? (!isNaN(Date.parse(value)) ? new Date(value) : undefined)
        : value;

      if (+date !== +this._date) {
        this._date = date;
      }
    }

  @Input()
    set dateFormat(value) {
      this.primengFormatting = toPrimeNgFormatting(value || DEFAULT_DATE_FORMAT);
    }

  @Input() placeholder = '';
  @Input() disabledDays = [];

  @Output() dateChange = new EventEmitter<Date>();

  _date: Date;
  primengFormatting = '';

  constructor() { }

  ngOnInit() {
  }

  dateUpdate(value: Date) {
    this.dateChange.emit(value);
  }
}

// primeNg date formatting mapping
// primeng is using jquery-ui mapping
const mapping = [
  ['ddd', 'D'],
  ['dddd', 'DD'],
  ['mmm', 'M'],
  ['mmmm', 'MM'],
  ['yy', 'y'],
  ['yyyy', 'yy'],
].map(([pattern, replacement]) => (
  [new RegExp(`\\b${pattern}\\b`), replacement]
));

function toPrimeNgFormatting(formatting) {
   return mapping.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), formatting);
}
