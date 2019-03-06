import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { CalendarModule, Calendar } from 'primeng/primeng';
import { take } from 'rxjs/operators';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      imports: [CalendarModule, FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('components input element should have value of correcty formatted date', async () => {
    const date = new Date(2018, 0, 1);

    component.date = date;
    component.dateFormat = 'mmm d, yyyy';

    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.value).toBe('Jan 1, 2018');
  });


  it('should display placeholder text', () => {
    const placeholder = 'This**Is**Placeholder';
    component.placeholder = placeholder;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.innerHTML).toContain(placeholder);
  });

  it('should emit notification when input value is changed', async (done) => {
    const input = fixture.debugElement.query(By.css('input'));
    component.dateFormat = 'mmm d, yyyy';
    component.placeholder = 'placeholder test';
    fixture.detectChanges();

    component.dateChange.asObservable().pipe(
      take(1)
    ).subscribe((e) => {
      expect(e).toEqual(new Date(2018, 0, 1));
      done();
    });

    input.nativeElement.value = 'Jan 1, 2018';
    input.nativeElement.dispatchEvent(new Event('keydown'));
    input.nativeElement.dispatchEvent(new Event('input'));
  });
});
