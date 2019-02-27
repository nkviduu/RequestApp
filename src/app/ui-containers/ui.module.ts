import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DropdownComponent,
  ContainerChbComponent,
  ContainerTextComponent,
  ContainerTimeComponent,
  ContainerListComponent,
  ContainerWrapperComponent,
  ContainerComponent,
  ContentComponent,
  SubmitButtonComponent,
  ContainerContentComponent,
  FormActionsComponent
} from './components';

import { IdService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DropdownComponent,
    ContainerComponent, // included here only becouse of AOT compilations issue
    ContainerChbComponent,
    ContainerTextComponent,
    ContainerTimeComponent,
    ContainerListComponent,
    ContainerWrapperComponent,
    SubmitButtonComponent,
    SubmitButtonComponent,
    ContentComponent,
    ContainerContentComponent,
    FormActionsComponent,
  ],
  providers: [
    IdService,
  ],
  exports: [
    DropdownComponent,
    ContainerChbComponent,
    ContainerTextComponent,
    ContainerTimeComponent,
    ContainerListComponent,
    ContainerWrapperComponent,
    SubmitButtonComponent,
    ContainerContentComponent,
    FormActionsComponent,
  ]
})
export class UiComponentsModule { }
