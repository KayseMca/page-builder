import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './main-content.component';
import { HomeComponent } from './pages/home/home.component';

import { PagePropertiesModule } from '../shared/components/page-properties.module';



const appRoutes:Routes  = [

  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent}
]

@NgModule({
  declarations: [MainContentComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    PagePropertiesModule
  ],
  exports:[MainContentComponent]
})
export class MainModuleModule { }
