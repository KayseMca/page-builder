import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ColorEvent } from 'ngx-color';
import { filter, Observable, of, Subscription, take } from 'rxjs';
import { PageDataService } from 'apps/page-builder/src/app/shared/services/page-data-service/page-data.service';

import { PagePropertyServiceService } from 'apps/page-builder/src/app/shared/services/page-property/page-property-service.service';
import { PageData, Typograph } from '@sognando-casa/api-interfaces';

@Component({
  selector: 'app-side-typography',
  templateUrl: './side-typography.component.html',
  styleUrls: ['./side-typography.component.scss']
})
export class SideTypographyComponent implements OnInit, OnDestroy {
 
  // color_variable!: string
  subscriptions:Subscription = new Subscription()
  color:string = "#ffffff"
  primaryColor = '#194D33';
  state = {
    h: 150,
    s: 0.50,
    l: 0.20,
    a: 1,
  };

  toggleList:{[key:string]:boolean}  = {'typo':false, 'color':true}
  currentRoute!: string;
  typograp_list!:Typograph[]|undefined

  //page_data!:PageData
  page_selected:PageData = new PageData()
  //saving_page_data:PageData = new PageData()

  
  constructor(
    private router:Router, 
    private pagePropertyService:PagePropertyServiceService,
    private pageDataService:PageDataService
    ) {

      this.subscriptions.add(pageDataService.allPagesData.subscribe(res=>{
        this.page_selected.page_styles = res[0].page_styles
        this.typograp_list = this.page_selected.page_styles?.typography
      })
      )
      // after App start let select page that in url
      //todo change this after App start
      // router.events.pipe(
      //   filter(event => event instanceof NavigationEnd)).pipe(take(1))
      // .subscribe((ev:any) => 
      //  {
      //    let url = ev.url; 
      //   this.currentRoute = url.substring(1)
      //    let selected:PageData = this.pageDataService.getPage(this.currentRoute) 
      //    this.page_selected = selected
      //    this.pagePropertyService.singlePageChoose(selected)

  
      //  });

     

      
      // get all font list
      
   }

  ngOnInit(): void {
   
    // this.pagePropertyService.selectedPage.pipe(take(1)).subscribe(res=>{
    //   //this.saving_page_data.id = res.page.id
    //   this.page_selected = res.page
      
      
    //   // get all typographs
    //   this.typograp_list = this.page_selected.page_styles?.typography
    // })

  }

  toggletypography(event:string){
    if(event==='color'){
      this.toggleList['typo'] = false
      this.toggleList['color']=true
    } else{
      this.toggleList['color']=false
      this.toggleList['typo'] = true
    }
  }

  handleChange(event:ColorEvent){
    //this.page_selected.id = NaN
    this.color = event.color.hex
    this.page_selected.page_styles = {background_color:this.color}
    this.pageDataService.updatePageData(this.page_selected)
    
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscriptions) this.subscriptions.unsubscribe()
  }
}
