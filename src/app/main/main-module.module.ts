import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content.component';
import { Routes } from '@angular/router';



@NgModule({
  declarations: [MainContentComponent],
  imports: [
    CommonModule
  ],
  exports:[MainContentComponent]
})
export class MainModuleModule { }
