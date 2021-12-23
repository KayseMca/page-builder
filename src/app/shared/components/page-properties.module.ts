import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{PagePropertiesComponent} from './page-properties.component'

@NgModule({
  declarations: [PagePropertiesComponent],
  imports: [
    CommonModule
  ],
  exports:[PagePropertiesComponent]
})
export class PagePropertiesModule { }
