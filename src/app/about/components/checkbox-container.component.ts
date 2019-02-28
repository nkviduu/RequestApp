import { Component, OnInit } from '@angular/core';

@Component({
template: `
  <div class="component-section">
    <h3 class="h3">
      Checkbox Container
    </h3>
    <p>
      This component is primary responsible for keeping request generation clean and minimal,
      providing only relevant inputs.
      Initial screen is kept minimal with additonal response options provided as selections are made.
    </p>

    <div>
      <rf-format-code
        content='
          <container-chb title="Container title">
              Container content visible only when title selected.
              Content can be text or composition of additional inputs.
              <container-chb title="Secondary input">
                  Secondary input content.
              </container-chb>
          </container-chb>
        '>
        <container-chb title="Container title">
          Container content visible only when title selected
          <container-chb title="Secondary input">Secondary input content</container-chb>
        </container-chb>
      </rf-format-code>
    </div>

    <p>
      The component is configurable title, subtitle, required and radioSelectChild parameters.
    </p>
    <p>
      <b>RadioSelectChild</b> is of particular interest as used without title it allows item grouping
      where selection of one child hides others.  For example select in requesting resources
      for a meeting a communication method can be selected but once it is selected rest of methods
      becomes noise so the can be hidden.
    </p>
    <rf-format-code
      content='
      <container-chb title="Meeting resources">
        <container-chb radioSelectChild>
          <container-chb title="Video conference call"></container-chb>
          <container-chb title="Audio conference call"></container-chb>
          <container-chb title="Skype"></container-chb>
        </container-chb>
        <container-chb title="Projector"></container-chb>
        <container-chb title="Laptop"></container-chb>
      </container-chb>
    '>
    <container-chb title="Meeting resources">
      <container-chb radioSelectChild>
        <container-chb title="Video conference call"></container-chb>
        <container-chb title="Audio conference call"></container-chb>
        <container-chb title="Skype"></container-chb>
      </container-chb>
      <container-chb title="Projector"></container-chb>
      <container-chb title="Laptop"></container-chb>
    </container-chb>

    </rf-format-code>
  </div>
`
})
export class CheckboxContainerComponent { }
