import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';




const materialModuels = [
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
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
