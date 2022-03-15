import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NxModule } from '@nrwl/angular';
import { AppComponent } from './app.component';

import {  RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import {productProductFeatureRoutes,ProductProductFeatureModule} from '@sognando-casa/product/product-feature'
// productProductFeatureRoutes
import {createCustomElement} from '@angular/elements'
import { HomeComponent } from 'libs/product/product-feature/src/lib/home/home.component';
// import { productProductFeatureRoutes } from 'libs/product/product-feature/src';
// import { productProductFeatureRoutes } from 'libs/product/product-feature/src';
// productProductFeatureRoutes
// import {productProductFeatureRoutes} from '@sognando-casa/product/product-feature'
// const router:Routes =[
//   {path:':page', component:DynamicLoadComponent, resolve:{
//     data:ResolveService
//   },
//   outlet:'template_edit'
// }
// ]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // NxModule,
    RouterModule.forRoot([
      {path:'',
      // component:HomeComponent,
      children:productProductFeatureRoutes 
    }
  ]),
  ProductProductFeatureModule,
  ],
  exports:[RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  // providers: [PageDataService, ResolveService],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(private injector:Injector){
    
  // }
  // ngDoBootstrap(): void {
  //   const webComponent = createCustomElement(AppComponent, {injector:this.injector});
  //   customElements.define('page-builder-root', webComponent);
  // }
}
