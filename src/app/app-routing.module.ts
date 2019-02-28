import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'demo', loadChildren: './hd/hd.module#HdModule' },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule',
  },
  { path: '**', redirectTo: '/about' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
