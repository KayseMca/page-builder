import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './main-content.component';
import { HomeComponent } from './pages/home/home.component';



const appRoutes:Routes  = [

  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent}
]

@NgModule({
  declarations: [MainContentComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports:[MainContentComponent]
})
export class MainModuleModule { }
