import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { DynamicLoadComponent } from './dynamic-load/dynamic-load.component';
import { ResolveService } from './resolve.service';
import { PageDataService } from './page-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, TestComponentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:TestComponentComponent, pathMatch:'full'},
      {path:':page', component:DynamicLoadComponent, resolve:{
        data:ResolveService
      }}
    ], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [PageDataService, ResolveService],
  bootstrap: [AppComponent],
})
export class AppModule {}
