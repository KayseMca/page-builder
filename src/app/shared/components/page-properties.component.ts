import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Subject, Subscription } from 'rxjs';
import { PageData, PageSettings } from 'src/app/_interfaces/_page';
import { PagePropertyServiceService } from '../service/page-property-service.service';

@Component({
  selector: 'app-page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.css']
})
export class PagePropertiesComponent implements OnInit, OnDestroy {

  closeTab!:Boolean
  pageTabOpen!:{}
  selectedPageData!:{page:any,tab:number}

  allTabs!:string[]
  selectedIndex:number=0
  allSubscriptions!:Subscription

  constructor(private pageService:PagePropertyServiceService) {
    
   }


  
  ngOnInit(): void {
    this.allSubscriptions.add(this.pageService.createdPage.subscribe(res=>{
      this.selectedPageData = res
      // console.log(res)
       this.allTabs = Object.keys(this.selectedPageData.page['page_settings'])
       this.selectedIndex = this.selectedPageData.tab
       
    })
    )
    
  }

  


  onTabChange(event:MatTabChangeEvent){
    console.log("tabb")
      console.log(event)
  }

  closeTabs(){
    this.closeTab = false
    this.allSubscriptions.add(this.pageService.closeComponentsTab(this.closeTab).subscribe(res=>console.log(res))
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.allSubscriptions.unsubscribe()
  }
  
}
