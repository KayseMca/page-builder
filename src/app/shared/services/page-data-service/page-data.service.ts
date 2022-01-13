import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { PageData } from 'src/app/_interfaces/_page';
import { data } from '../data';
import { PagePropertyServiceService } from '../page-property/page-property-service.service';

@Injectable({
  providedIn: 'root',
  
})
export class PageDataService {


  private dataSource =  new BehaviorSubject<PageData[]>(data)
  readonly allPagesData: Observable<PageData[]> = this.dataSource.asObservable()
  

  constructor(private ppd:PagePropertyServiceService) {
    this.ppd.singlePageChoose(data[0], '')
  }

  


  creatNewPage(page:PageData){
    let pages:any[] = this.dataSource.getValue()
    pages.push(page)
    this.dataSource.next(pages)
  }

  updatePageData(data: PageData) {

    let oldData: any[] = [...this.dataSource.value]
    let id;

    console.log(data.page_styles?.background_color, data.id)
    oldData.forEach((item: PageData) => {
      id = item.id === data.id ? true : false
      // check and change  the other items home_page value 
      if (data.home_page) {
       
        if (item.home_page && !id) {
          item.home_page = false
        }
      }else{
        // spreading object data to sourceData
        // and checking which page data modifying
        console.log(id)
        if(id){

          console.log("here")
          item.page_settings.permissions = {...item.page_settings?.permissions ,...data?.page_settings?.permissions}
          item.page_settings.seo_basics = {...item.page_settings.seo_basics ,...data?.page_settings?.seo_basics}
          item.page_settings.social_share = {...item.page_settings.social_share,...data?.page_settings?.social_share}
          item.page_settings.advanced_seo = {...item.page_settings.advanced_seo,...data?.page_settings?.advanced_seo}
      
          item.name = this.assign(data.name,item.name)
          item.home_page = this.assign(data.home_page, item.home_page)

          //page style
          item!.page_styles = {background_color:data.page_styles?.background_color}

        }
      }
   
    })


    //let name = 'test'
    //let c = this.validate(b) || name
    console.log(oldData)
    this.dataSource.next(oldData)
  }


  validate(name:any){
    return  !!name
  }

  assign(data:any, old:any){
    if(!!data) return data
    return old
  }

  // draft code maybe use later
   draftCode(item:PageData, data:PageData){
     item = {
      ...item,          //copy everything from item
      name:data.name,
      home_page:data.home_page ? data.home_page:item.home_page,          
      page_settings:{
        social_share:{ // inside page_settings copy social_share object and update it with data  from data variable
          ...item.page_settings?.social_share,
          ...data.page_settings?.social_share
        },
        permissions:{ // same here
          ...item.page_settings?.permissions,
          ...data.page_settings?.permissions
        },
        seo_basics:{ 
          ...item.page_settings?.seo_basics,
          ...data.page_settings?.seo_basics
        },
        advanced_seo:{ 
          ...item.page_settings?.advanced_seo,
          ...data.page_settings?.advanced_seo
        },
        
      },

      page_styles:{
        background_color:data.page_styles?.background_color
      }
    }

  }


  deletePage(id:number){
    let data = this.dataSource.getValue()

    let pageId = data.findIndex(res=> res.id === id)
    data.splice(pageId,1)

    this.dataSource.next(data)
  }
}
