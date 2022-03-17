import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import {ProductProductFeatureModule, productProductFeatureRoutes} from '@sognando-casa/product/product-feature'

// interface CustomRoute extends Route {
//   data?: PageData;
// }

const routes: Route[] = [
  // {path:'edit', loadChildren: ()=> import('./main/main-module.module').then(m => m.MainModuleModule), outlet:'main'},
  //{path:"", loadChildren:()=>import('./create-duplicate-page/page-modify.module').then(m=>m.PageModifyModule)},
  //{path}
  // {path:'', redirectTo:'edit/:id', pathMatch:'full'}
  {path:'', children:productProductFeatureRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
}),
ProductProductFeatureModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
