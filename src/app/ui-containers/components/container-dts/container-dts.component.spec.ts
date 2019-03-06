import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

import { ContainerDtsComponent } from './container-dts.component';
import { DatetimeslotComponent } from '../datetimeslot/datetimeslot.component';
import { IDateTimeSlot } from '../datetimeslot/models';

import { ContainerWrapperComponent } from '../container/container-wrapper.component';
import { IdService } from '../../services';
import { ContentService } from '../../../services';
import { HDConfig } from '../../../config';

describe('ContainerDtsComponent', () => {
  let component: ContainerDtsComponent;
  let fixture: ComponentFixture<ContainerDtsComponent>;
  let datetimeslot: DatetimeslotComponent;

  const dateformat = 'mm-dd-yyyy';
  const disabledDays = [0, 6];
  const startTime = '8:00 AM';
  const endTime = '7:00 PM';
  const step = 15;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerDtsComponent,
        ContainerWrapperComponent,
        MockComponent(DatetimeslotComponent)
      ],
      providers: [
        { provide: ContentService, useValue: { updateItem() {} } },
        { provide: HDConfig,
          useValue: {
            dateformat,
            disabledDays,
            timeDropdown: { startTime, endTime, step }
          },
        },
        IdService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    datetimeslot = fixture.debugElement
      .query(By.directive(DatetimeslotComponent))
      .componentInstance as DatetimeslotComponent;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should pass to datetimeslot config service params:
    dateformat
    disabledDays
    fromtime
    totime
    step`,
    () => {
      expect(datetimeslot.dateFormat).toBe(dateformat);
      expect(datetimeslot.disabledDays).toEqual(disabledDays);
      expect(datetimeslot.startTime).toEqual(startTime);
      expect(datetimeslot.endTime).toEqual(endTime);
      expect(datetimeslot.step).toEqual(step);
      expect(datetimeslot.placeholder).toBe(dateformat.toUpperCase());
    }
  );

  it('on datepicker date change event it should update component date ', () => {
    const data: IDateTimeSlot = {
      date: new Date('2018-03-03'),
      fromtime: '9:30AM',
      totime: '11:00AM',
      valid: true,
    };

    datetimeslot.change.emit(data);
    expect(component.value).toEqual(data);
  });

  it('on datetimeslot change event it should validate date, fromtime, totime and update content service with new data', () => {
    const data: IDateTimeSlot = {
      date: new Date('2018-03-03'),
      fromtime: '9:30AM',
      totime: '11:00AM',
      valid: true,
    };

    const contentService = fixture.debugElement.injector.get(ContentService);
    const path = 'testPath';
    component.path = path;

    spyOn(contentService, 'updateItem');
    const isValidSpy = spyOn(component, 'validateComponentValue').and.callThrough();

    datetimeslot.change.emit(data);

    expect(isValidSpy).toHaveBeenCalled();
    expect(contentService.updateItem)
      .toHaveBeenCalledWith(path, data);
  });
});
