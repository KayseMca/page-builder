import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDuplicatePageComponent } from './create-duplicate-page/create-duplicate-page.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { DynamicLoadComponent } from './dynamic-load/dynamic-load.component';
import { PageData } from '@sognando-casa/api-interfaces';
//import { DynamicElementDirective } from './dynamic-element.directive';



interface CustomRoute extends Route {
  data?: PageData;
}

export const routes: CustomRoute[] = [
  //{path:'', component:CreateDuplicatePageComponent}
  //{path:'/test/:pagename', component:CreateDuplicatePageComponent}
  // {path:'', redirectTo:'/home', pathMatch:'full'},
  
]




@NgModule({
  declarations: [
    
  
    CreateDuplicatePageComponent,
              DynamicLoadComponent,
   
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[CreateDuplicatePageComponent]
})
export class PageModifyModule { }
