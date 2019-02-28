import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiComponentsModule } from '../ui-containers/ui.module';
import { AboutComponent } from './components/about.component';
import { VideoDemoComponent } from './components/video-demo.component';
import { ConfigurationComponent } from './components/configuration.component';
import { StateManagementServiceComponent } from './components/state-management-service.component';
import { CheckboxContainerComponent } from './components/checkbox-container.component';
import { DateTimeSlotComponent } from './components/date-time-slot.component';
import { FormatCodeComponent } from './components/format-code.component';
import { UpComponent } from './components/up.component';

const routes: Routes = [
  { path: '', component: AboutComponent,
    children: [
      { path: '', component: VideoDemoComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: 'checkbox-container-component', component: CheckboxContainerComponent },
      { path: 'state-management-service', component: StateManagementServiceComponent },
      { path: 'date-time-slot-component', component: DateTimeSlotComponent },
    ]
  },
];

@NgModule({
  declarations: [
    AboutComponent,
    VideoDemoComponent,
    ConfigurationComponent,
    FormatCodeComponent,
    CheckboxContainerComponent,
    DateTimeSlotComponent,
    StateManagementServiceComponent,
    UpComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    // FormsModule,
    // ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AboutModule {

}
