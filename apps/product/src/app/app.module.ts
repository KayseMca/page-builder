import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {  RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { DynamicLoadComponent } from './dynamic-load/dynamic-load.component';
import { ResolveService } from './resolve.service';
import { PageDataService } from './page-data.service';
import { HttpClientModule } from '@angular/common/http';

import {createCustomElement} from '@angular/elements'

const router:Routes =[
  {path:':page', component:DynamicLoadComponent, resolve:{
    data:ResolveService
  },
  outlet:'template_edit'
}
]

@NgModule({
  declarations: [AppComponent, TestComponentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(router, { initialNavigation: 'enabledBlocking' }),
  ],
  exports:[RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [PageDataService, ResolveService],
  // bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap{
  constructor(private injector:Injector){
    
  }
  ngDoBootstrap(): void {
    const webComponent = createCustomElement(AppComponent, {injector:this.injector});
    customElements.define('page-builder-root', webComponent);
  }
}
