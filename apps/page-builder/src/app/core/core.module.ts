import { APP_INITIALIZER, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TemplateToEditService } from './service/template-to-edit.service';
import { HttpClientModule } from '@angular/common/http';



export function initTemplate(appInitService: TemplateToEditService) {
  return () => { 
    return appInitService.init();
  }
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    TemplateToEditService,
    {
      provide: APP_INITIALIZER,
      useFactory:initTemplate,
      deps:[TemplateToEditService],
      multi: true
     }
  ]
})
export class CoreModule { }
