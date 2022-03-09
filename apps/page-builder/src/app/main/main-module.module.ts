import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './main-content.component';
import { HomeComponent } from './pages/home/home.component';

import { PagePropertiesModule } from '../shared/components/page-properties.module';
import { Page2Component } from './pages/page2/page2.component';
import { PageData } from '@sognando-casa/api-interfaces';




const appRoutes:Route[]  = [

  // {path:'home', component:HomeComponent},
  // {path:'', component:MainContentComponent, outlet:'templateEdit'},
  // {path:"", loadChildren:()=>import('../create-duplicate-page/page-modify.module').then(m=>m.PageModifyModule)},
  // {path:'**', redirectTo:':templateId', pathMatch:'full'},
  // {path:'**', redirectTo:'/home', pathMatch:'full'},
]

@NgModule({
  declarations: [MainContentComponent, HomeComponent, Page2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    PagePropertiesModule,
    
  ],
  exports:[MainContentComponent]
})
export class MainModuleModule { }
