import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content.component';



@NgModule({
  declarations: [MainContentComponent],
  imports: [
    CommonModule
  ],
  exports:[MainContentComponent]
})
export class MainModuleModule { }
