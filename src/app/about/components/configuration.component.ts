import { Component } from '@angular/core';

@Component({
  template: `
  <div class="component-section">
    <h3>
      Configuration
    </h3>
    <section>
      <p>
       Request hierarchy is defined and configured
       by building hierachy of apps cotainerised ui components:
      </p>
      <ul>
        <li>Checkbox container</li>
        <li>Date, time, time slot components</li>
        <li>Text and list components</li>
      </ul>
      <p>
        Internally components are wired to
        <a [routerLink]="['../state-management-service']">state managemenet service</a>
        that determines validity of request and manages submission or provides appropriate error message
        if required input is missing.
      </p>

      <p>
        Currently configuration happens at compile time.  Future explorations could be done to allow
        for JSON type of configuration initiating dynamic container instantiation at the start of application.
      </p>

      </section>
    </div>
`})
export class ConfigurationComponent { }
