import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  HDComponent,
  OpenRequestsComponent,
  OpenRequestItemComponent,
  DebugContainerComponent
} from '../components';

import { UiComponentsModule } from '../ui-containers/ui.module';

const routes: Routes = [
  { path: '', component: HDComponent,
  },
];

@NgModule({
  declarations: [
    HDComponent,
    OpenRequestsComponent,
    OpenRequestItemComponent,
    DebugContainerComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    RouterModule.forChild(routes),
  ]
})
export class HdModule {

}
