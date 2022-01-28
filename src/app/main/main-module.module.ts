import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './main-content.component';
import { HomeComponent } from './pages/home/home.component';

import { PagePropertiesModule } from '../shared/components/page-properties.module';
import { Page2Component } from './pages/page2/page2.component';



const appRoutes:Routes  = [

  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'page2', component:Page2Component},
  //{path:'**', component:Dynamc},
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
