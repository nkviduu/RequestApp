import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  HDComponent,
} from '../components';

import { UiComponentsModule } from '../ui-containers/ui.module';

const routes: Routes = [
  { path: '', component: HDComponent,
  },
];

@NgModule({
  declarations: [
    HDComponent,

  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    RouterModule.forChild(routes),
  ]
})
export class HdModule {

}
