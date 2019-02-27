import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { TestComponent } from './components/test/test.component';

import {
  ContentService,
  RemoteService,
  RemoteLsService
} from './services';

import { SharedModule } from './shared/shared.module';
import { HDConfig } from './config';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    HDConfig,
    ContentService,
    { provide: RemoteService, useClass: RemoteLsService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
