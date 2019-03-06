import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockComponent } from 'ng-mocks';

import { ContainerDtComponent } from './container-dt.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { ContainerWrapperComponent } from '../container/container-wrapper.component';
import { IdService } from '../../services';
import { ContentService } from '../../../services';
import { HDConfig } from '../../../config';


describe('ContainerDtComponent', () => {
  let component: ContainerDtComponent;
  let fixture: ComponentFixture<ContainerDtComponent>;
  let datepicker: DatepickerComponent;
  const dateformat = 'mm-dd-yyyy';
  const disabledDays = [0, 6];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerDtComponent,
        ContainerWrapperComponent,
        MockComponent(DatepickerComponent),
      ],
      providers: [
        { provide: ContentService, useValue: { updateItem() {} } },
        { provide: HDConfig, useValue: { dateformat, disabledDays } },
        IdService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    datepicker = fixture.debugElement
      .query(By.directive(DatepickerComponent))
      .componentInstance as DatepickerComponent;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should pass to datepicker dateformat and disabled days from configuration service', () => {
    expect(datepicker.dateFormat).toBe(dateformat);
    expect(datepicker.disabledDays).toEqual(disabledDays);
    expect(datepicker.placeholder).toBe(dateformat.toUpperCase());
  });

  it('on datepicker date change event it should update component date ', () => {
    const date = new Date('2018-03-03');

    datepicker.dateChange.emit(date);
    expect(component.value.date).toEqual(date);
  });

  it('on datepicker date change event it should validate date and update content service with new data', () => {
    const date = new Date('2018-03-03');
    const contentService = fixture.debugElement.injector.get(ContentService);
    const path = 'testPath';
    component.path = path;

    spyOn(contentService, 'updateItem');
    const isValidSpy = spyOn(component, 'validateComponentValue').and.callThrough();

    datepicker.dateChange.emit(date);

    expect(isValidSpy).toHaveBeenCalled();
    expect(contentService.updateItem)
      .toHaveBeenCalledWith(path, { date, valid: true });
  });
});
