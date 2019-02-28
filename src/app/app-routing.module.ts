import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: 'demo', loadChildren: './hd/hd.module#HdModule' },
  { path: 'test', component: TestComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
