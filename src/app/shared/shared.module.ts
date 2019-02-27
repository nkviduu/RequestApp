import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimateOnClickDirective, TabNavigationDirective } from './directives';


@NgModule({
  declarations: [
    AnimateOnClickDirective,
    TabNavigationDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    AnimateOnClickDirective,
    TabNavigationDirective,
  ]
})
export class SharedModule {

}
