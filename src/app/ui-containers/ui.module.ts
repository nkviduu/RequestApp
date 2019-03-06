import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';

import {
  ContainerComponent,
  ContainerWrapperComponent,
  ContainerChbComponent,
  ContainerTextComponent,
  ContainerListComponent,
  ContainerDtsComponent,
  ContainerDtComponent,
  ContainerTimeComponent,
  ContainerContentComponent,
  SubmitButtonComponent,
  FormActionsComponent,
  DatetimeslotComponent,
  DatepickerComponent,
  ContentComponent,
  DropdownComponent,
} from './components';

import { IdService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  declarations: [
    ContainerComponent, // included here only becouse of AOT compilations issue
    ContainerWrapperComponent,
    ContainerChbComponent,
    ContainerTextComponent,
    ContainerListComponent,
    ContainerDtsComponent,
    ContainerDtComponent,
    ContainerTimeComponent,
    ContainerContentComponent,
    FormActionsComponent,
    SubmitButtonComponent,
    DatetimeslotComponent,
    ContentComponent,
    DropdownComponent,
    DatepickerComponent,
  ],
  providers: [
    IdService,
  ],
  exports: [
    ContainerChbComponent,
    ContainerTextComponent,
    ContainerListComponent,
    ContainerDtsComponent,
    ContainerDtComponent,
    ContainerTimeComponent,
    ContainerContentComponent,
    FormActionsComponent,

    DatepickerComponent, // temp only
  ]
})
export class UiComponentsModule { }
