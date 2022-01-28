import { Component, OnInit } from '@angular/core';
import { PageDataService } from 'src/app/shared/services/page-data-service/page-data.service';
import { PageData } from 'src/app/_interfaces/_page';

@Component({
  selector: 'app-create-duplicate-page',
  template: `
   
  `,
  styles: [
  ]
})
export class CreateDuplicatePageComponent  {

  private allPages!:PageData[]
  constructor(private pages:PageDataService) {
    this.pages.allPagesData.subscribe(res=>{
      this.allPages = res
    })
   }

  // ngOnInit(): void {
  // }

   createNewPage(){
    console.log("creating new page", this.allPages.length)
    console.log("created this new page")
    this.pages.creatNewPage(this.newPageData())
  }

   dublicatePage(){

  }

  private newPageData():PageData{

    let len = this.allPages.length
    console.log(len)
    let newPage: PageData = new PageData()
    let settings = ['Settings','SEO Basics','Social Share','Rename','Dublicate','Edit Page','Hide','Delete']
    //creating new page with some values
    newPage = {
      name: 'New Page',
      home_page : false,
      id:1,
      // id:this.allPagesData.length+1,
      hide:false,
      settings:settings,
      page_settings:{seo_basics:{},advanced_seo:{},page_info:{},social_share:{}},
      page_styles : {...this.allPages[0].page_styles},
      
      page_url : `newpage${len+1}`
    }
    return newPage
  }
}
