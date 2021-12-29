import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{PagePropertiesComponent} from './page-properties.component';
import { PageInfoComponent } from './page-info/page-info.component';
import { SeoBasicsComponent } from './seo-basics/seo-basics.component';
import { PermissionsComponent } from './permissions/permissions.component'
import { MaterialModuleModule } from '../models/material-module.module';

@NgModule({
  declarations: [PagePropertiesComponent, PageInfoComponent, SeoBasicsComponent, PermissionsComponent],
  imports: [
    CommonModule,
    MaterialModuleModule
  ],
  exports:[PagePropertiesComponent, PageInfoComponent, SeoBasicsComponent, PermissionsComponent]
})
export class PagePropertiesModule { }
