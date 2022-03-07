import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateToEditService } from './service/template-to-edit.service';

export function initTemplate(appInitService: TemplateToEditService) {
  return () => { 
    console.log("initliazing the template")
    return appInitService.init();
  }
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
