import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { MockComponent } from 'ng-mocks';

import { DatetimeslotComponent } from './datetimeslot.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

describe('DatetimeslotComponent', () => {
  let component: DatetimeslotComponent;
  let fixture: ComponentFixture<DatetimeslotComponent>;
  let datepickerComponent: DatepickerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
        DatetimeslotComponent,
        MockComponent(DatepickerComponent),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeslotComponent);
    component = fixture.componentInstance;

    component.startTime = '8:30 AM';
    component.endTime = '6:30 PM';
    component.step = 30;

    fixture.detectChanges();

    datepickerComponent = fixture.debugElement
      .query(By.directive(DatepickerComponent))
      .componentInstance as DatepickerComponent;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it ('should pass date, placeholder, dateFormat to internal date picker component', () => {
    const date = new Date('2018-08-07');
    const dateFormat = 'yyyy-mm-dd';
    const placeholder = 'Enter date..';

    component.date = date;
    component.dateFormat = dateFormat;
    component.placeholder = placeholder;
    fixture.detectChanges();

    expect(datepickerComponent.date).toEqual(date);
    expect(datepickerComponent.dateFormat).toEqual(dateFormat);
    expect(datepickerComponent.placeholder).toEqual(placeholder);
  });

  it ('should update date when datepicker changes and emit notification', () => {
    const date = new Date('2018-08-03');

    const spy = jasmine.createSpy();
    component.change.asObservable().pipe(take(1)).subscribe(spy);

    datepickerComponent.dateChange.emit(date);
    expect(component.date).toBe(date);
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0].date).toEqual(date);
  });

  it ('start, end time and step input values should be reflected in time dropdowns lists', () => {
    const startTime = '10:30 AM';
    const endTime = '11:30 AM';
    const expectedFromList = ['10:30 AM', '11:00 AM'];
    const expectedToList =               ['11:00 AM', '11:30 AM'];

    component.startTime = startTime;
    component.endTime = endTime;
    fixture.detectChanges();

    const [fromDropdown, toDropdown] = fixture.debugElement
      .queryAll(By.directive(DropdownComponent))
      .map(de => de.componentInstance as DropdownComponent);

    expect(fromDropdown.list).toEqual(expectedFromList, 'fromTimeList');
    expect(toDropdown.list).toEqual(expectedToList, 'fromTimeList');
  });

  it ('to time list should start with the next time slot after selected from time', () => {
    component.fromtime = '11:00 AM';

    const [, toTimeList] = component.dropdownLists;
    expect(toTimeList[0]).toBe('11:30 AM');
  });

  it('if duration has been set replicated it if from time position is changed by adjusting totime', () => {
    component.currentSelection.fromtime = '9:00 AM';
    component.currentSelection.totime = '11:00 AM';

    const spy = jasmine.createSpy();
    component.change.asObservable().pipe(take(1)).subscribe(spy);
    const [fromDropdown] = fixture.debugElement
      .queryAll(By.directive(DropdownComponent));

    fromDropdown.triggerEventHandler('selected', '9:30 AM');

    fixture.detectChanges();
    console.log(spy.calls.mostRecent().args);
  });

  it('should unset to field if from field is set to last item as this gives no time slot span', () => {
    const endTime = '6:00 PM';
    component.fromtime = '5:00 PM';
    component.endTime = endTime;
    component.totime = endTime;
    expect(component.currentSelection.totime).toBe(endTime);

    const spy = jasmine.createSpy();
    component.change.asObservable().pipe(take(1)).subscribe(spy);
    const [fromDropdown] = fixture.debugElement
      .queryAll(By.directive(DropdownComponent));
    fromDropdown.triggerEventHandler('selected', endTime);

    expect(spy.calls.mostRecent().args[0].totime).toBe('');
  });

  it('should emit change event on from and to time change', () => {
    const [fromDropdown, toDropdown] = fixture.debugElement
    .queryAll(By.directive(DropdownComponent));
    const fromTimeSpy = jasmine.createSpy();

    const fromtime = '9:00 AM';
    component.change.asObservable().pipe(take(1)).subscribe(fromTimeSpy);
    fromDropdown.triggerEventHandler('selected', fromtime);
    const fromUpdate = fromTimeSpy.calls.first();

    expect(fromUpdate).toBeTruthy('update exists');
    expect(fromUpdate.args[0].fromtime).toBe(fromtime);

    const totime = '11:00 AM';
    const toTimeSpy = jasmine.createSpy();
    component.change.asObservable().pipe(take(1)).subscribe(toTimeSpy);
    toDropdown.triggerEventHandler('selected', totime);
    const toUpdate = toTimeSpy.calls.first();

    expect(toUpdate).toBeTruthy('update exists');
    expect(toUpdate.args[0].totime).toBe(totime);
  });

  it('should not notify when update values are the same as current values', () => {
    component.fromtime = '9:00 AM';
    component.totime = '10:00 AM';

    const updateSpy = jasmine.createSpy();
    component.change.subscribe(updateSpy);
    const [fromDropdown, toDropdown] = fixture.debugElement
      .queryAll(By.directive(DropdownComponent));

    fromDropdown.triggerEventHandler('selected', '9:00 AM');
    toDropdown.triggerEventHandler('selected', '10:00 AM');

    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('should report valid value only all if date, fromtime and totime all are set', () => {
    const [fromDropdown, toDropdown] = fixture.debugElement
      .queryAll(By.directive(DropdownComponent));

    const spy = jasmine.createSpy();
    component.change.asObservable().subscribe(spy);

    datepickerComponent.dateChange.emit(new Date(2017, 6, 5));

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0].valid).toBeFalsy('missing from and to fields');

    spy.calls.reset();
    fromDropdown.triggerEventHandler('selected', '9:00 AM');

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0].valid).toBeFalsy('missing to field');

    spy.calls.reset();
    toDropdown.triggerEventHandler('selected', '10:00 AM');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0].valid).toBeTruthy('valid');

    // unset from time and valid should be false
    spy.calls.reset();
    fromDropdown.triggerEventHandler('selected', '');

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.mostRecent().args[0].valid).toBeFalsy('missing from time');
  });
});
