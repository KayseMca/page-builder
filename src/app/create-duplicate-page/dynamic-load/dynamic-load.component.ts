import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'src/app/_interfaces/_page';

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
  constructor(private sanitizer: DomSanitizer, private active:ActivatedRoute, private pages:PageDataService) { 

    pages.allPagesData.subscribe(res=>{
      console.log(res)
    })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.template)
    let tem = this.template['nativeElement']

    console.log(tem)
    this.active.data.subscribe((res:any)=>{
    
      console.log(res)
     tem.innerHTML= res['page_styles']['html']+`<strong>${res.name}</strong> `
 
      // tem.nativeElement = this.makeSanitize(res['html'])
    })
  }
  makeSanitize(str: any)
  {
    
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }
}
