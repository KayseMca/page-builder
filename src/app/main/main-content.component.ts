import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataService } from '../shared/services/page-data-service/page-data.service';
import { SeoService } from '../shared/services/seo/seo.service';
import { PageData } from '../_interfaces/_page';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {

  subscribtion!:Subscription
  data!:PageData[] 
  constructor(private dataService:PageDataService, private seo:SeoService) { 
    this.subscribtion.add(this.dataService.allPagesData.subscribe(res=>{
      this.data = res

      // add tags
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        let page_title = element.page_settings.seo_basics?.page_title
        this.seo.addTitle(page_title)
        // this.seo.addMetaTags(element)
      }
    }))
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscribtion){
      this.subscribtion.unsubscribe()
    }
    
  }
}
