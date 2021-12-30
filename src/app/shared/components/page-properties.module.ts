import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{PagePropertiesComponent} from './page-properties.component';
import { PageInfoComponent } from './page-info/page-info.component';
import { SeoBasicsComponent } from './seo-basics/seo-basics.component';
import { PermissionsComponent } from './permissions/permissions.component'
import { MaterialModuleModule } from '../models/material-module.module';
import { SocialShareComponent } from './social-share/social-share.component';
import { AdvancedSeoComponent } from './advanced-seo/advanced-seo.component';

@NgModule({
  declarations: [PagePropertiesComponent, PageInfoComponent, SeoBasicsComponent, PermissionsComponent, SocialShareComponent, AdvancedSeoComponent],
  imports: [
    CommonModule,
    MaterialModuleModule
  ],
  exports:[PagePropertiesComponent, PageInfoComponent, SeoBasicsComponent, PermissionsComponent]
})
export class PagePropertiesModule { }
