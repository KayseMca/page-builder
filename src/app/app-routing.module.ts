import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { PageData } from './_interfaces/_page';

interface CustomRoute extends Route {
  data?: PageData;
}

const routes: CustomRoute[] = [
  {path:'', loadChildren: ()=> import('./main/main-module.module').then(m => m.MainModuleModule)},
  //{path:"", loadChildren:()=>import('./create-duplicate-page/page-modify.module').then(m=>m.PageModifyModule)},
  //{path}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
