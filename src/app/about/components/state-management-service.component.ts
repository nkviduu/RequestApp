
import { Component } from '@angular/core';

@Component({
  template: `
  <div class="component-section">
    <h3>
      Request App State Management
    </h3>
    <p>
      State management is responsible for:
    </p>
    <ul>
      <li>
        Determining if form is in valid submission state and enabling submit button.
        Request is in valid submission state if there are no incomplete required items.
      </li>
      <li>
        Generation of request content as text so it can be used in email or other text based
        communication.
      </li>
      <li>
        List and allow to view and edit previously submitted requests.
      </li>
    </ul>
    <h4 class="h4">Implementation detail</h4>
    <p>
      The service discovers the form configurations state tree at the applications
      startup time by traversing container component hierarchy.

      During interaction with rquest service recives state updates from each component
      and determines completion status and makes it available as a stream.
      To restore perevious submission the service issues request to change state change to
      all connected components.
    </p>
  </div>
`})
export class StateManagementServiceComponent { }
