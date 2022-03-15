import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataService } from '../shared/services/page-data-service/page-data.service';
import { SeoService } from '../shared/services/seo/seo.service';

import { PageData, TemplateApi } from '@sognando-casa/api-interfaces';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  @ViewChild('template', {static:true}) template!:ElementRef
  subscribtion:Subscription = new Subscription()
  data!:TemplateApi 
  constructor(private dataService:PageDataService, private seo:SeoService) { 
    this.subscribtion.add(this.dataService.allPagesData.subscribe((res:TemplateApi)=>{
     this.data = res
    }))
  }

  ngOnInit(): void {
    
  }


ngAfterContentInit(): void {
  //Called after ngOnInit when the component's or directive's content has been initialized.
  //Add 'implements AfterContentInit' to the class.
  // this.template.nativeElement.innerHTML = `${this.data.template_element}`
}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscribtion){
      this.subscribtion.unsubscribe()
      document.removeChild(this.template.nativeElement)
    }
    
  }
}
