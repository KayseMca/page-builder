import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { startWith, Subject, Subscription, take } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';

import { PagePropertyServiceService } from '../services/page-property/page-property-service.service';

@Component({
  selector: 'app-page-properties',
  templateUrl: './page-properties.component.html',
  styleUrls: ['./page-properties.component.css']
})
export class PagePropertiesComponent implements OnInit {

  closeTab!:Boolean
  pageTabOpen!:{}
  selectedPageData!:{page:any,tab:string}

  // @Input() pageSelected!:PageData
  homepage:Boolean = false
  // allTabs!:string[]
  selectedIndex:number=0
  allTabs = ['Page Info','SEO Basics','Permissions','Social Share', 'Advanced SEO']


  constructor(private pageService:PagePropertyServiceService) {
    
   }


   ngOnChanges(changes: SimpleChanges): void {
     //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
     //Add '${implements OnChanges}' to the class.
     if(changes['pageSelected'].currentValue){
       console.log(changes)
     }
   }
  
  ngOnInit(): void {
    console.log('page property')

    this.pageService.createdPage.subscribe(res=>{
      this.selectedPageData = res
      console.log(this.selectedPageData)
      this.homepage = this.selectedPageData.page['home_page']
      // set dynamically tab selected
      if(this.selectedPageData.tab==='Settings') {
        this.selectedIndex=0
      }else{
        for (let index = 0; index < this.allTabs.length; index++) {
          if(this.allTabs[index]===this.selectedPageData.tab){
            this.selectedIndex = index
            break
          }
        }

      }
      //  this.selectedIndex = this.selectedPageDatka.tab
       
    })
    
  }

  


  onTabChange(event:MatTabChangeEvent){
    console.log("tabb")
      console.log(event)
  }

  closeTabs(){
    this.closeTab = false
    this.pageService.closeComponentsTab(this.closeTab).pipe(take(1)).subscribe(res=>console.log(res))
    
  }

  
}
