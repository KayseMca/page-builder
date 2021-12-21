import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button'


const materialModuels = [
  MatSidenavModule,
  MatButtonModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModuels
  ],
  exports:[
    ...materialModuels
  ] 
})
export class MaterialModuleModule { }
