import { Component } from '@angular/core';

@Component({
  template: `
  <div class="component-section">
    <h3 class="h3">
      Data Time Slot component
    </h3>
    <p>
      Data Time Slot component provides abilty to efficienty schedule resources
      such as conference rooms in well defined availble time slots.
    </p>
    <p>
      Components prevents entries of invalid length timeslots.
    </p>

    <rf-format-code
      content='
      <vt-datetimeslot
        date="10/12/2018"
        dateFormat="mm/dd/yyyy"
        startTime="8:00 AM"
        endTime="6:30 PM"
        fromtime="9:00 AM"
        totime="4:00 PM">
      </vt-datetimeslot>
      '>
      <vt-datetimeslot
        date="10/12/2018"
        dateFormat="mm/dd/yyyy"
        startTime="8:00 AM"
        endTime="6:30 PM"
        step="15"
        fromtime="9:00 AM"
        totime="4:00 PM"
      ></vt-datetimeslot>
    </rf-format-code>
  </div>
`})
export class DateTimeSlotComponent { }
