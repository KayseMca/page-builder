import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';


// interface CustomRoute extends Route {
//   data?: PageData;
// }

const routes: Route[] = [
  {path:'edit', loadChildren: ()=> import('./main/main-module.module').then(m => m.MainModuleModule), outlet:'main'},
  //{path:"", loadChildren:()=>import('./create-duplicate-page/page-modify.module').then(m=>m.PageModifyModule)},
  //{path}
  // {path:'', redirectTo:'edit/:id', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
