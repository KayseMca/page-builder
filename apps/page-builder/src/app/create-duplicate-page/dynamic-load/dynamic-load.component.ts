import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDataService } from 'apps/page-builder/src/app/shared/services/page-data-service/page-data.service';
import { PagePropertyServiceService } from 'apps/page-builder/src/app/shared/services/page-property/page-property-service.service';
import { PageData } from 'apps/page-builder/src/app/_interfaces/_page';

@Component({
  selector: 'app-dynamic-load',
  template: `
    
  <div style='margin:auto' #tem ></div>
  `,
  styles: [
  ]
})
export class DynamicLoadComponent implements OnInit {

  @ViewChild('tem', {static: true}) template!:ElementRef<any>
  selected!:PageData
  constructor(private sanitizer: DomSanitizer, private active:ActivatedRoute, private pages:PagePropertyServiceService) { 

    // pages.selectedPage.subscribe(res=>{
    //   this.selected = res['page']
    // })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    let tem = this.template['nativeElement']

    
    this.active.data.subscribe((res:any)=>{
    
      console.log(res)
    // let res = this.selected
      
    //  tem.innerHTML= res['page_styles']['html']+`<strong>${res.name}</strong> `
 
    tem.innerHTML = res.page_styles?.html
      // tem.nativeElement = this.makeSanitize(res.page_styles?.html)
    })
  }
  makeSanitize(str: any)
  {
    
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }
}
